import React, { useEffect, useRef, useState } from 'react';
import './Components.css'

import test_db from '../test_db';

const Albums = () => {
  const songs = test_db.song;

  return (
    <div className="albums-container">
      {songs.map((song, index) => {
        return (
          <div className="albums-item">
            <img src={song.album_image} className="albums-image" key={index} />
            <span className="albums-name">{song.album}</span>
            <span className="albums-artist">{song.artist}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Albums;