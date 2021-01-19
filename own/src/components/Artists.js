import React, { useEffect, useRef, useState } from 'react';
import './Components.css';

import test_db from '../test_db';

const Artists = () => {
  const songs = test_db.song;

  return (
    <div className="artists-container">
      {songs.map((song, index) => {
        return (
          <div className="artists-item" key={index}>
            <img src={song.artist_image} className="artists-image"/>
            <span>{song.artist}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Artists;