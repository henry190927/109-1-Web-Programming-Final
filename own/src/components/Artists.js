import React, { useEffect, useRef, useState } from 'react';
import './Components.css';
import './SubComponents.css';

import test_db from '../test_db';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Artist from './Artist';

const Artists = ({ setSongName }) => {
  const songs = test_db.song;
  const [isSelected, setIsSelected] = useState(false);
  const [artistselected, setArtistSelected] = useState(null);

  return (
    <div className="artists-container">
      {!isSelected ? 
      songs.map((song, index) => {
        return (
          <div className="artists-item" key={index}
            onClick={() => {
              setIsSelected(true);
              setArtistSelected(song.artist);
            }}
          >
            <img src={song.artist_image} className="artists-image"/>
            <span>{song.artist}</span>
          </div>
        )
      }) : 
      <div className="back-button-header">
        <div className="back-container"
          onClick={() => {
            setIsSelected(false);
            setArtistSelected(null);
          }} >
          <ArrowLeftOutlined style={{
            marginTop: '18px', 
            marginLeft: '10px',
            fontSize: '24px',
            color: 'rgb(200, 200, 200)'
          }}/>
        </div>
        <span className="back-info">Back to Artists</span>
      </div>}
      {artistselected ? 
      <Artist 
        setSongName={setSongName}
        artist={artistselected}
      /> : null}
    </div>
  )
}

export default Artists;