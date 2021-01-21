const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating sub-schemas 
const SongSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Song.name field is required.']
    },
    artist: {
      type: String,
      required: [true, 'Song.artist field is required.']
    },
    album: {
      type: String,
      required: [true, 'Song.album is required.']
    },
    artist_image: {
      type: String,
      required: [true, 'Song.artist_image field is required.']
    },
    album_image: {
      type: String,
      required: [true, 'Song.album_image field is required.']
    },
    audio: {
      type: String,
      required: [true, 'Song.audio field is required.']
    },
    time: {
      type: Number,
      required: [true, 'Song.time field is required.']
    }
    // maybe add 'inDatabase' field
  }
)

// const PlaylistSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Playlist.name field is required.']
//     },
//     image: {
//       type: String,
//       required: [true, 'Playlist.image field is required.']
//     },
//     author: {
//       type: String,
//       required: [true, 'Playlist.author field is required.']
//     },
//     songs: {
//       type: [SongSchema],
//       required: [true, 'Playlist.songs field is required.']
//     }
//   }
// )

const DataSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Data.name field is required.']
    },
    password: {
      type: String,
      required: [true, 'Data.password field is required.']
    },
    appmusic: {
      type: [SongSchema],
      required: [true, 'Data.appmusic field is required.']
    },
    database: {
      type: [SongSchema],
      required: [true, 'Data.database field is required.']
    }
  }
)

const Data = mongoose.model('data', DataSchema);

module.exports = Data;