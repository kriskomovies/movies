import {getMoviesByType} from "@/services/movies";


export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
            const {type, page} = req.query;
            const {movies, totalCount}  = await getMoviesByType(type, page);
            res.status(200).json({movies})
        }catch(err){
            res.status(500).json({ message: err.toString() })
        }
    } else {
        // Handle any other HTTP method
    }
}