import React, { useEffect, useRef, useState } from 'react';
import './Components.css';
import './SubComponents.css';

import test_db from '../test_db';
import { ArrowLeftOutlined , PlusOutlined } from '@ant-design/icons'
import Artist from './Artist';
import Album from './Album';

const Browse = ({ setSongName }) => {
  const songs = test_db.song;
  const [isSelected, setIsSelected] = useState(false);
  const [albumselected, setAlbumSelected] = useState(null);
  const [artistselected, setArtistSelected] = useState(null);
  
  return (
    <div className="browse-top">
      {!isSelected ?
      <div className="browse-container">
        <div className="recommend-albums">
          <div className="header">
            <span>Recommend Albums</span>
          </div>

          <div className="albums-container">
            {songs.map((song, index) => {
              return (
                <div className="albums-item" key={index}
                  onClick={() => {
                    setIsSelected(true);
                    setAlbumSelected(song.album);
                  }}
                >
                  <img src={song.album_image} className="albums-image" />
                  <span className="albums-name">{song.album}</span>
                  <span className="albums-artist">{song.artist}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="recommend-artists">
          <div className="header">
            <span>Recommend Artists</span>
          </div>

          <div className="artists-container">
            {songs.map((song, index) => {
              return (
                <div className="artists-item" key={index} 
                  onClick={() => {
                    setIsSelected(true);
                    setArtistSelected(song.artist);
                  }}
                >
                  <img src={song.artist_image} className="artists-image" />
                  <span className="artists-name">{song.artist}</span>
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
                <div className="song-item" key={index} >
                  <div className="image-container" onClick={() => setSongName(song.name)}>
                    <img src={song.album_image} />
                  </div>
                  <div className="song-datas">
                    <div className="song-meta-datas" onClick={() => setSongName(song.name)}>
                      <span className="song-name">{song.name}</span>
                      <span className="song-artist">{song.artist}</span>
                    </div>
                    <div className="song-album" onClick={() => setSongName(song.name)}></div>
                    <div className="song-add-button" onClick={() => console.log("hello")}>
                      <PlusOutlined style={{fontSize: '24px', paddingTop: '5px', color: 'rgb(126, 126, 126)'}}/> 
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="recently-played">
          <div className="header">
            <span>Recently Played</span>
          </div>

          <div className="albums-container">
            {songs.map((song, index) => {
              return (
                <div className="albums-item" key={index}
                  onClick={() => {
                    setIsSelected(true);
                    setAlbumSelected(song.album);
                  }}
                >
                  <img src={song.album_image} className="albums-image" />
                  <span className="albums-name">{song.album}</span>
                  <span className="albums-artist">{song.artist}</span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="playlist-suggestion">
          <div className="header">
            <span>You may want to listen...</span>
          </div>
        </div>
      </div> : 
      <div className="back-button-header">
        <div className="back-container"
          onClick={() => {
            setIsSelected(false);
            setArtistSelected(null);
            setAlbumSelected(null);
          }} >
          <ArrowLeftOutlined style={{
            marginTop: '18px', 
            marginLeft: '10px',
            fontSize: '24px',
            color: 'rgb(200, 200, 200)'
          }}/>
        </div>
        <span className="back-info">Back to Browse</span>
      </div>}
      {albumselected ? 
        <Album 
          setSongName={setSongName}
          album={albumselected}
        />
      : artistselected ? 
        <Artist 
          setSongName={setSongName}
          artist={artistselected}
        />
      : null}
    </div>
  )
}

export default Browse;