import {ANIME, MOVIE, SERIE} from "@/constants/moviesTypes";

export function getTypeQuery(type){
    if(type !== MOVIE){
       return {type: type, season: 1, episode: 1}
    }
    return {type: type}
}

export function getGenreQuery(genreId) {
    return  {
        $and: [
            {
                genres: genreId,
            },
            {
                $or: [
                    {type: MOVIE},
                    {type: SERIE, season: 1, episode: 1},
                    {type: ANIME, season: 1, episode: 1}
                ]
            }
        ]
    }
}