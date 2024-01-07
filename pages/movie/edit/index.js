import {useEffect, useState} from "react";
import {EMPTY_STRING} from "@/lib/helpers";
import {isMovieOkForDb} from "@/lib/movies";
import axios from "axios";
import {ANIME, MOVIE, SERIE} from "@/constants/moviesTypes";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Alert, Snackbar} from "@mui/material";

import styles from "./editMovie.module.scss";

const initialFormData = {
    _id: EMPTY_STRING,
    name: EMPTY_STRING,
    description: EMPTY_STRING,
    trailer: EMPTY_STRING,
    poster: EMPTY_STRING,
    genres: EMPTY_STRING,
    actors: EMPTY_STRING,
    year: 0,
    imdbRating: 0,
    type: MOVIE,
    season: 0,
    seasonName: EMPTY_STRING,
    episode: 0,
    episodeName: EMPTY_STRING,
    vidPlayer: EMPTY_STRING,
    voePlayer: EMPTY_STRING
};

const success = "success";
const error = "error"


function EditMovie(props){
    const [search, setSearch] = useState(EMPTY_STRING);
    const [formData, setFormData] = useState(initialFormData);
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState(success);
    const [message, setMessage] = useState("Movie edited successfully.");

    const {episode, season, type, imdbID} = formData;

    useEffect(() => {
        if(imdbID){
            const vidPlayer = getVidPlayer(type, imdbID, season, episode)
            setFormData({...formData, vidPlayer})
        }
    }, [episode, season, type])
    const isAddMovieEnabled = () => {
        return isMovieOkForDb(formData);
    };

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    async function handleChange(event) {
        event.preventDefault();
        let {name, value} = event.target;
        if (typeof value === "string") {
            value = value.trim();
        }
        setFormData({...formData, [name]: value});
    }

    async function handleSearchChange(event) {
        event.preventDefault();
        const {value} = event.target;
        setSearch(value);
    }

    async function handleSearchClick() {
        const response = await axios.get(`/api/movie/search/?id=${search}`);
        const {movie} = response.data;
        console.log("movie", movie)
        setFormData({...movie})
    }

    function getVidPlayer(type, imdbID, season = 1, episode = 1 ) {
        switch (type){
            case MOVIE:
                return `https://vidsrc.to/embed/movie/${imdbID}`
            case SERIE:
                return `https://vidsrc.to/embed/tv/${imdbID}/${season}/${episode}`
            default: {
                return ""
            }
        }
    }
    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.put(`/api/movie/`, formData);
            const {type} = formData;
            if(type === MOVIE ){
                setFormData(initialFormData);
                setSearch("");
            }
        } catch (err) {
            const {message} = err?.response?.data;
            setMessage(`Movie failed to be edited: ${message}`);
            setSeverity(error);
        }
        setOpen(true);
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <TextField
                    className={styles.textField}
                    name="name"
                    label="Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <TextField
                    className={styles.textField}
                    name="description"
                    label="Description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                />
                <TextField
                    className={styles.textField}
                    name="trailer"
                    label="Trailer"
                    value={formData.trailer}
                    onChange={handleChange}
                />
                <TextField
                    className={styles.textField}
                    name="poster"
                    label="Poster"
                    value={formData.poster}
                    onChange={handleChange}
                />
                <TextField
                    className={styles.textField}
                    name="genres"
                    label="Genres"
                    value={formData.genres}
                    onChange={handleChange}
                />
                <TextField
                    className={styles.textField}
                    name="actors"
                    label="Actors"
                    value={formData.actors}
                    onChange={handleChange}
                />
                <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <TextField
                        style={{width: '100%'}}
                        className={styles.textField}
                        name="year"
                        label="Year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                    />
                    <TextField
                        style={{width: '100%'}}
                        className={styles.textField}
                        name="imdbRating"
                        label="IMDB Rating"
                        type="number"
                        value={formData.imdbRating}
                        onChange={handleChange}
                    />
                </div>
                <TextField
                    className={styles.textField}
                    name="vidPlayer"
                    label="Vid Player"
                    value={formData.vidPlayer}
                    onChange={handleChange}
                />
                <TextField
                    className={styles.textField}
                    name="voePlayer"
                    label="Voe Player"
                    value={formData.voePlayer}
                    onChange={handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{margin: '10px'}}
                    disabled={!isAddMovieEnabled()}
                >
                    Edit movie
                </Button>
            </form>
            <div className={styles.searchContainer}>
                <TextField
                    style={{margin: '10px 20px'}}
                    onChange={handleSearchChange}
                    className={styles.textField}
                    name="searchMovie"
                    label="Search for movie"
                    value={search}
                />

                <Button
                    onClick={() => handleSearchClick()}
                    style={{alignSelf: "center"}}
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    Search for movie
                </Button>
                <hr/>
                {formData.type !== MOVIE && (<div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <TextField
                            className={styles.textField}
                            name="season"
                            label="Season Number"
                            type="number"
                            value={formData.season}
                            onChange={handleChange}
                        />
                        <TextField
                            className={styles.textField}
                            name="seasonName"
                            label="Season Name"
                            value={formData.seasonName}
                            onChange={handleChange}
                        />
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <TextField
                            className={styles.textField}
                            name="episode"
                            label="Episode Number"
                            type="number"
                            value={formData.episode}
                            onChange={handleChange}
                        />
                        <TextField
                            className={styles.textField}
                            name="episodeName"
                            label="Episode Name"
                            value={formData.episodeName}
                            onChange={handleChange}
                        />
                    </div>
                </div>)}
                <FormControl style={{margin: '20px'}}>
                    <InputLabel id="movie-type">Movie Type</InputLabel>
                    <Select
                        name={"type"}
                        label="Movie Type"
                        value={formData.type}
                        onChange={handleChange}
                    >
                        <MenuItem value={MOVIE}>{MOVIE}</MenuItem>
                        <MenuItem value={SERIE}>{SERIE}</MenuItem>
                        <MenuItem value={ANIME}>{ANIME}</MenuItem>
                    </Select>
                </FormControl>
                <div className={styles.imageContainer}>
                    <img src={formData.poster} alt={'Poster'}/>
                </div>
            </div>
            <Snackbar
                className={styles.snackBar}
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity={severity} sx={{width: '100%'}}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default EditMovie;