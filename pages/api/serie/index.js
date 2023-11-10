import {getSeriesBySeason} from "@/services/movies";

export default async function handler(req, res) {
    if (req.method === "GET") {
        try {
            const {name, season} = req.query;
            const serie = await getSeriesBySeason(name, season);
            res.status(200).json({serie})
        } catch (err) {
            res.status(500).json({message: err.toString()})
        }
    }
    res.status(404);
}