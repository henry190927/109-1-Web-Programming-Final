import React, { useEffect, useRef, useState } from 'react';
import './Components.css';

import test_db from '../test_db';
import { PlusOutlined } from '@ant-design/icons'

const Browse = ({ setSongName }) => {
  const songs = test_db.song;

  // const songs_num = songs.length;
  // const full_block_num = Math.floor(songs_num/4);
  // const left_songs_num = songs_num % 4;
  
  return (
    <div className="browse-container">
      <div className="recommend-albums">
        <div className="header">
          <span>Recommend Albums</span>
        </div>

        <div className="albums-container">
          {songs.map((song, index) => {
            return (
              <div className="albums-item" key={index}>
                <img src={song.album_image} className="albums-image" />
                <span className="albums-name">{song.album}</span>
                <span className="albums-artist">{song.artist}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="recommend-songs">
        <div className="header">
          <span>Recommend Songs</span>
        </div>

        <div className="items-container">
          {songs.map((song, index) => {

            return (
              <div className="song-item" key={index} 
                onClick={() => {
                  setSongName(song.name)
                }}
              >
                <div className="image-container">
                  <img src={song.album_image} />
                </div>
                <div className="song-datas">
                  <div className="song-meta-datas">
                    <span className="song-name">{song.name}</span>
                    <span className="song-artist">{song.artist}</span>
                  </div>
                  <div className="song-album"></div>
                  <div className="song-add-button">
                    <PlusOutlined style={{fontSize: '24px', paddingTop: '5px', color: 'rgb(126, 126, 126)'}}/> 
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Browse;