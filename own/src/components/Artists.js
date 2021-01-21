import React, { useEffect, useRef, useState } from 'react';
import './Components.css';
import './SubComponents.css';

import test_db from '../test_db';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Artist from './Artist';

const Artists = ({ setSongName, AppMusic, DataBase }) => {
  const songs = DataBase;
  const [isSelected, setIsSelected] = useState(false);
  const [artistselected, setArtistSelected] = useState(null);

  // filter out artists
  let artists = []
  songs.map(song => {
    if (!artists.some(s => song.artist === s.artist)) {
      artists.push(song)
    }
  })

  return (
    <div className="artists-container">
      {!isSelected ? 
      artists.map((song, index) => {
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
        AppMusic={DataBase}
      /> : null}
    </div>
  )
}

export default Artists;