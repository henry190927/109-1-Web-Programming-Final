import React, { useEffect, useRef, useState } from 'react';
import './Components.css';
import './SubComponents.css';

import test_db from '../test_db';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Album from './Album';

const Albums = ({ setSongName }) => {
  const songs = test_db.song;
  const [albumselected, setAlbumSelected] = useState(null);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="albums-container">
      {!isSelected ? 
      songs.map((song, index) => {
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
        setSongName={setSongName}
        album={albumselected}
      /> 
      : null}
    </div>
  )
}

export default Albums;