import mongoose from 'mongoose'

const MoviesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    trailer: {
        type: String
    },
    poster: {
        type: String
    },
    netuPlayer: {
        type: String
    },
    voePlayer: {
        type: String
    },
    genres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genres'
    }],
    actors: {
        type: [String]
    },
    year: {
        type: Number,
        required: true
    },
    imdbRating: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    season: {
        type: Number,
    },
    seasonName: {
        type: String
    },
    episode: {
        type: Number,
    },
    episodeName: {
        type: String
    }
})

// Create a text index on the 'name' field
MoviesSchema.index({name: 'text'});
export default mongoose.models.Movies || mongoose.model('Movies', MoviesSchema, "Movies")