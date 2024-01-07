import dbConnect from "@/lib/dbConnect";
import {Movies, Genres} from "@/models";
import {createGenre} from "@/services/genres/genres";
import {convertToActorsArray, parseYear} from "@/lib/movies";
import {ANIME, MOVIE, SERIE} from "@/constants/moviesTypes";

import axios from "axios";


export async function createMovie(movie) {
    const polishedMovie = await polishMovieBeforeUpdate(movie);
    polishedMovie.actors = convertToActorsArray(movie.actors);
    await checkForExistingMovie(polishedMovie);
    const newMovie = await new Movies(polishedMovie);
    return newMovie.save();
}

export async function editMovie(movie) {
    const polishedMovie = await polishMovieBeforeUpdate(movie);
    const updatedMovie = await Movies.findByIdAndUpdate(polishedMovie._id, polishedMovie, {new: true});
    return updatedMovie;
}

async function polishMovieBeforeUpdate(movie) {
    await dbConnect();
    const genrePromises = movie
        .genres.split(',')
        .filter(genre => genre.trim() !== '')
        .map(async (genre) => {
            const dbGenre = await createGenre(genre.trim());
            return dbGenre._id;
        })
    const createdGenres = await Promise.all(genrePromises);
    movie.genres = createdGenres;
    return movie;
}

export async function getMovieById(id) {
    await dbConnect();

    const movie = await Movies
        .findById(id)
        .populate('genres', 'name _id')
        .lean();


    const movieData = {
        movie,
        ...await enrichSeriesAndAnimes(movie)
    }

    return movieData;
}

export async function getMovieDetailsFromAPI(movieName) {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=746c3a95&t=${movieName}`);
    const {Title, Plot, Year, Genre, Actors, Poster, imdbRating, imdbID} = response.data;
    const movie = {
        name: Title,
        poster: Poster,
        description: Plot,
        genres: Genre,
        actors: Actors,
        imdbRating,
        imdbID,
        year: parseYear(Year),

    }
    return movie;
}

export async function getCleanMovieById(id) {
    await dbConnect();
    const movie = await Movies
        .findById(id)
        .populate('genres', 'name')
        .lean();

    const genres = movie.genres.reduce((acc, genre, currentIndex) => {
        acc = acc + `${genre.name}`
        if(currentIndex !== movie.genres.length - 1){
            acc = acc + ","
        }

        return acc;
    }, "")

    movie.genres = genres;
    return movie;
}

//-----------------------------FUNCTIONS-------------------------------------

async function enrichSeriesAndAnimes(movie) {
    const {type, _id, season, name} = movie;
    if (type !== MOVIE) {
        const episodes = await Movies
            .aggregate([
                {
                    $match: {
                        _id: {$ne: _id},
                        name: name,
                        type: type,
                        season: {$eq: season}
                    }
                },
                {
                    $sort: {episode: 1}
                }
            ])
            .exec();

        const seasons = await Movies.distinct('season', {type, name, season: {$ne: 0}}).exec();

        return {
            episodes,
            seasons
        }

    }
    return {};
}

async function checkForExistingMovie(movie) {
    const {type} = movie;
    switch (type) {
        case MOVIE:
            await checkIfMovieExists(movie);
            break;
        case SERIE:
        case ANIME:
            await checkIfSerieExists(movie);
            break;
        default:
            throw new Error(`Movie type: ${type} does not exist.`)
    }
}

export async function checkIfMovieExists(movie) {
    const {name} = movie;

    const existingMovie = await Movies.findOne({name});

    if (existingMovie) {
        throw new Error(`Movie with name: ${name} already exists.`);
    }
}

async function checkIfSerieExists(serie) {
    const {name, season, episode, type} = serie;

    const existingSerie = await Movies.findOne({name, season, episode, type});

    if (existingSerie) {
        throw new Error(`Serie with name: ${name}, season: ${season} and episode: ${episode} already exists.`);
    }
}
