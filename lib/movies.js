import { MOVIE} from "@/constants/moviesTypes";
import {EMPTY_STRING} from "@/lib/helpers";

const movieRequiredStringProps = ["name", "description", "trailer", "poster", "genres", "type"];
const movieRequiredNumProps = ["year", "imdbRating"];

const seriesRequiredStringProps = ["name", "description", "poster", "genres", "type"];
const seriesRequiredNumProps = ["year", "imdbRating", "season", "episode"];

export function isMovieOkForDb(formData) {
    const {type} = formData;
    if(type === MOVIE){
        return checkMovieProps(formData);
    }else{
        return checkSerieProps(formData);
    }
}

//this is fucked up char –
export function parseYear(year) {
    if (year.toString().includes('–')) {
        return year.split('–')[0];
    }
    return year;
}

export function convertToActorsArray(actors) {
    return actors.split(',').map(actor => actor.trim());
}

function checkMovieProps(formData){
    let result = true;
    movieRequiredStringProps.forEach(prop => {
        const value = formData[prop];
        if(!value || value === EMPTY_STRING){
            result = false;
        }
    })

    movieRequiredNumProps.forEach(prop => {
        const value = formData[prop];
        if(!value || value === 0){
            result = false;
        }
    })
    return result;
}

function checkSerieProps(formData){
    let result = true;
    seriesRequiredStringProps.forEach(prop => {
        const value = formData[prop];
        if(!value || value === EMPTY_STRING){
            result = false;
        }
    })

    seriesRequiredNumProps.forEach(prop => {
        const value = formData[prop];
        if(!value || value === 0){
            result = false;
        }
    })
    return result;
}

