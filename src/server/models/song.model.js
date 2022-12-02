const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let songSchema = new Schema({
    Title: { type: String, required: true, max: 300 },              // Title name of song
    Artist: { type: String, required: true, max: 300 },             // Artist name of song
    Album: { type: String, required: true, max: 300 },              // Album name of song
    Track: { type: Number, required: true, max: 999 },
    Year: { type: Number, required: true, max: 2021 },              // Year of song released
    Length: { type: Number, required: true, max: 2000 },            // Play duration of song
    Genre: { type: String, required: true, max: 300 },              // Genre name of song
    Reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],      // Revies given to song; Object of review type
    Rating: { type: Number, max: 5 },                               // Cummalative rating of song
    isHidden: { type: Boolean, required: true, default: false },    // Is the song visible to user?
    reviewCount :  { type: Number }                                 // Number of reviews given to the song released
}, { collection: 'songs' });

songSchema.index(
    { 
        Title: 'text', 
        Artist: 'text', 
        Album: 'text', 
        Genre: 'text' 
    }, 
    {
        name: 'Song Index', 
        weights: 
            {
                Title: 10, 
                Artist: 4, 
                Album: 2, 
                Genre: 1
            }
    });

// Export the model
module.exports = mongoose.model('Song', songSchema);