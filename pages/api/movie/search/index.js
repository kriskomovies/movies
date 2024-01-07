import { getCleanMovieById} from "@/services/movie";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const {id} = req.query;
            const movie = await getCleanMovieById(id);
            res.status(200).json({movie})
        } catch (err) {
            res.status(500).json({message: err.toString()})
        }
    }
}