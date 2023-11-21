import {MOVIE, SERIE, ANIME} from "@/constants/moviesTypes";
import {Movies, Genres} from "@/models"
import dbConnect from "@/lib/dbConnect";
import {getGenreQuery, getTypeQuery} from "@/lib/queries";

// export async function getAllMovies() {
//     try {
//         await dbConnect();
//         const query = {
//             $or: [
//                 {type: MOVIE},
//                 {type: SERIE, season: 1, episode: 1},
//                 {type: ANIME, season: 1, episode: 1}
//             ]
//         };
//
//         const movies = await Movies.find(query)
//             .populate('types', 'name _id types')
//             .lean()
//             .limit(20)
//
//         const totalCount = await Movies.countDocuments(query);
//         return {
//             movies,
//             totalCount
//         }
//     } catch (err) {
//         console.log(`Error getAllMovies: ${err.toString()}`);
//         return [];
//     }
//
// }

export async function getBySearch(searchString) {
    await dbConnect();

    return Movies.find({
        $and: [
            {
                $or: [
                    {name: {$regex: searchString, $options: 'i'}},
                    {name: {$eq: searchString}}
                ]
            },
            {
                $or: [
                    {type: MOVIE},
                    {type: SERIE, season: 1, episode: 1},
                    {type: ANIME, season: 1, episode: 1}
                ]
            }
        ]
    })
        .limit(50)
        .populate('genres', 'name _id')
        .lean();
}

export async function getMoviesByGenre(genreId, page = 1) {
    await dbConnect();
    const moviesTakeCount = 16;
    const skip = (page - 1) * moviesTakeCount;

    const query = getGenreQuery(genreId);

    const movies = await Movies.find(query)
        .sort({year: -1, imdbRating: -1})
        .skip(skip)
        .limit(moviesTakeCount)
        .lean();

    const totalCount = await Movies.countDocuments(query);
    return {
        movies,
        totalCount
    };
}

export async function getSeriesBySeason(name, season) {
    await dbConnect();
    return await Movies.findOne(
        {
            name,
            season,
            episode: 1
        }
    ).select('_id').exec();
}

export async function getMoviesByType(type = MOVIE, page = 1) {
    const moviesTakeCount = 32;
    const skip = (page - 1) * moviesTakeCount;
    const query = getTypeQuery(type);

    try {
        await dbConnect();

        const movies = await Movies
            .find(query)
            .skip(skip)
            .limit(moviesTakeCount)
            .lean();


        const totalCount = await Movies.countDocuments(query);

        return {
            movies,
            totalCount
        };

    } catch (err) {
        console.log(`Error getAllMovies: ${err.toString()}`);
        return {}
    }
}
