import dbConnect from "@/lib/dbConnect";
import {Genres } from "@/models"

export async function createGenre(name) {
    try {
        const existingGenre = await Genres.findOne({name: name});
        if (!existingGenre) {
            const newGenre = new Genres({name: name});
            return await newGenre.save();
        }

        return existingGenre;
    } catch (error) {
        throw error;
    }
}

export async function getAllGenres(){
    await dbConnect();
    return Genres.find().lean();
}
