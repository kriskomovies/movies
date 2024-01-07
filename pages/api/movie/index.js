import {createMovie, editMovie, getMovieDetailsFromAPI} from "@/services/movie";


export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const {searchTerm} = req.query;
            const movie = await getMovieDetailsFromAPI(searchTerm);
            res.status(200).json({movie})
        } catch (err) {
            res.status(500).json({message: err.toString()})
        }
    }

    if (req.method === 'POST') {
        try {
            const movie = await createMovie(req.body)
            res.status(200).json({message: `Movie: ${movie.name} successfully created.`})
        } catch (err) {
            console.log("err", err)
            res.status(500).json({message: err.toString()})
        }
    }

    if(req.method === "PUT"){
        try {
            const updatedMovie = editMovie(req.body);
            res.status(200).json({updatedMovie})
        } catch (err) {
            res.status(500).json({message: err.toString()})
        }
    }
}