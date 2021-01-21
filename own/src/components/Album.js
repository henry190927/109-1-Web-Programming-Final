import React, { useEffect, useRef, useState } from 'react';
import './SubComponents.css'

import { PlusOutlined, PlayCircleOutlined } from '@ant-design/icons';

import { useMutation } from '@apollo/client';
import {
  ADD_SONG_TO_DATABASE,
  ADD_ALBUM_TO_DATABASE
} from '../graphql'

const Album = ({ username, setSongName, album, AppMusic }) => {
  const songs = AppMusic.filter(song => song.album === album);
  const song = songs.find(song => song.album === album);

  const [addSongToDataBase] = useMutation(ADD_SONG_TO_DATABASE);
  const [addAlbumToDataBase] = useMutation(ADD_ALBUM_TO_DATABASE);

  const handleAddSong = async (songname) => {
    await addSongToDataBase({
      variables: {
        name: songname,
        user: username
      }
    })
  }

  const handleAddAlbum = async (albumname) => {
    await addAlbumToDataBase({
      variables: {
        name: albumname,
        user: username
      }
    })
  }

  const getTime = (timeload) => {
    let min = Math.floor(timeload / 60);
    let sec = Math.floor(timeload % 60);

    if (sec < 10) {
      return min + ':0' + sec; 
    }
    return min + ':'+ sec;
  }

  return (
    <div className="album-container">
      <div className="album-image-container">
        <div className="image-container">
          <img src={song.album_image} className="album-image" />
        </div>
      </div>

      <div className="album-data-container">
        <div className="album-play-data">
          <div className="metadata">
            <span className="album-name">{song.album}</span>
            <span className="artist-name">{song.artist}</span>
          </div>
          <div className="play-header">
            <div className="play-button-container">
              <div className="play-button">
                <PlayCircleOutlined style={{
                  width: '40%', 
                  fontSize: '22px', 
                  marginTop: '10px', 
                  color: 'gray'
                }}/>
                <span className="play-name">Play</span>
              </div>
            </div>
            <div className="blankspace"></div>
            <div className="add-button-container" 
              onClick={() => {
                handleAddAlbum(song.album);
              }}
            >
              <div className="add-button">
                <PlusOutlined style={{
                  width: '30%', 
                  fontSize: '22px', 
                  marginTop: '10px', 
                  color: 'gray'
                }}/>
                <span className="add-name">Add to database</span>
              </div>
            </div>
          </div>
        </div>

        <div className="album-songs-data">
          {songs.map((song, index) => {
            return (
              <div className="song-item" key={index}>
                <div className="song-datas">
                  <div className="song-meta-datas" onClick={() => setSongName(song.name)}>
                    <span className="song-name">{song.name}</span>
                  </div>
                  <div className="song-album" onClick={() => setSongName(song.name)}></div>
                  <div className="song-add-button" 
                    onClick={() => {
                      handleAddSong(song.name)
                    }}
                  >
                    <PlusOutlined style={{fontSize: '20px', paddingTop: '5px', color: 'rgb(126, 126, 126)'}}/> 
                  </div>
                  <div className="song-time" onClick={() => setSongName(song.name)}>
                    <span className="time">{getTime(song.time)}</span>
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

export default Album;