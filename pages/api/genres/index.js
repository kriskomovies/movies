import {getAllGenres} from "@/services/genres/genres";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            const genres = await getAllGenres();
            res.status(200).json({genres: genres})
        } catch (err) {
            res.status(404).json({message: err.toString()})
        }
    } else {
        res.status(404);
    }
}