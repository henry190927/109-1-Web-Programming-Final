import React, { useEffect, useRef, useState } from 'react';
import './SubComponents.css'

import { ArrowLeftOutlined } from '@ant-design/icons';
import Album from './Album';

const Artist = ({ username, setSongName, artist, AppMusic }) => {
  const songs = AppMusic.filter(song => song.artist === artist);
  const [isSelected, setIsSelected] = useState(false);
  const [albumselected, setAlbumSelected] = useState(null);

  // filter out albums
  let albums = []
  songs.map(song => {
    if (!albums.some(s => song.album === s.album)) {
      albums.push(song);
    }
  })
  
  return (
    <div className="artist-container">
      {!isSelected ? 
      albums.map((song, index) => {
        return (
          <div className="albums-item" key={index}
            onClick={() => {
              setIsSelected(true);
              setAlbumSelected(song.album)
            }}
          >
            <img src={song.album_image} className="albums-image" />
            <span className="albums-name">{song.album}</span>
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
      </div>}
      {albumselected ? 
      <Album 
        username={username}
        setSongName={setSongName}
        album={albumselected}
        AppMusic={AppMusic}
      /> 
      : null}
    </div>
  )
}

export default Artist;