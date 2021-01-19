import React, { useEffet, useState, useRef } from 'react';
import './Components.css';

import test_db from '../test_db';

const Songs = ({ setSongName }) => {
  const songs = test_db.song;

  const getTime = (timeload) => {
    let min = Math.floor(timeload / 60);
    let sec = Math.floor(timeload % 60);

    if (sec < 10) {
      return min + ':0' + sec; 
    }
    return min + ':'+ sec;
  }

  return (
    <div className="songs-container">
      <div className="songs-header">
        <span className="image-title"></span>
        <span className="name-title">Name</span>
        <span className="artist-title">Artist</span>
        <span className="album-title">Album</span>
        <span className="time-title">Time</span>
      </div>

      <div className="songs-bottom">
        {songs.map((song, index) => {

          return (
            <div className="songs-item-container" key={index} 
              onClick={() => {
                setSongName(song.name);
              }}
            >
              <div className="songs-item">
                <img src={song.album_image} className="songs-item-image"/>
                <span className="songs-item-name">{song.name}</span>
                <span className="songs-item-artist">{song.artist}</span>
                <span className="songs-item-album">{song.album}</span>
                <span className="songs-item-time">{getTime(song.time)}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default Songs;