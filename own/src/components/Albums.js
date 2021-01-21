import React, { useEffect, useRef, useState } from 'react';
import './Components.css';
import './SubComponents.css';

import test_db from '../test_db';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Album from './Album';

const Albums = ({ username, setSongName, AppMusic, DataBase }) => {
  const songs = DataBase;
  const [albumselected, setAlbumSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  // filter out albums
  let albums = []
  songs.map(song => {
    if (!albums.some(s => song.album === s.album)) {
      albums.push(song);
    }
  })

  return (
    <div className="albums-container">
      {!isSelected ? 
      albums.map((song, index) => {
        return (
          <div className="albums-item" 
            onClick={() => {
              setIsSelected(true);
              setAlbumSelected(song.album);
            }}
          >
            <img src={song.album_image} className="albums-image" key={index} />
            <span className="albums-name">{song.album}</span>
            <span className="albums-artist">{song.artist}</span>
          </div>
        )
      }) : 
      <div className="back-button-header">
        <div className="back-container"
          onClick={() => {
            setIsSelected(false);
            setAlbumSelected(null);
          }} >
          <ArrowLeftOutlined style={{
            marginTop: '18px', 
            marginLeft: '10px',
            fontSize: '24px',
            color: 'rgb(200, 200, 200)'
          }}/>
        </div>
        <span className="back-info">Back to Albums</span>
      </div>
      }
      {albumselected ? 
      <Album 
        username={username}
        setSongName={setSongName}
        album={albumselected}
        AppMusic={DataBase}
      /> 
      : null}
    </div>
  )
}

export default Albums;