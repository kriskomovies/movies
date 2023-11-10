import {getBySearch} from "@/services/movies"

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
            const {searchString} = req.query;
            const movies = await getBySearch(searchString);
            res.status(200).json({movies})
        }catch(err){
            res.status(500).json({ message: err.toString() })
        }
    } else {
        // Handle any other HTTP method
    }
}