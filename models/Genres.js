import mongoose from 'mongoose'

const GenresSchema = new mongoose.Schema({
    name: {
        type: String,
    }
})

GenresSchema.index({name: 'text'});
export default mongoose.models.Genres || mongoose.model('Genres', GenresSchema, "Genres")