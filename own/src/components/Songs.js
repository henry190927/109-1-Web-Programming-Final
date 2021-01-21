import React, { useEffect, useState, useRef } from 'react';
import './Components.css';

import { CloseOutlined } from '@ant-design/icons'
import { useMutation } from '@apollo/client';

import {
  REMOVE_SONG_FROM_DATABASE,
} from '../graphql'

const Songs = ({ username, setSongName, DataBase }) => {
  const songs = DataBase;

  const [removeSongFromDataBase] = useMutation(REMOVE_SONG_FROM_DATABASE);

  const handleRemoveSong = async (songname) => {
    await removeSongFromDataBase({
      variables: {
        name: songname,
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
            <div className="songs-item-container" key={index}>
              <div className="songs-item">
                <img src={song.album_image} className="songs-item-image"
                  onClick={() => {
                    setSongName(song.name);
                  }}
                />
                <span className="songs-item-name" 
                  onClick={() => {
                    setSongName(song.name);
                  }}
                >{song.name}</span>
                <span className="songs-item-artist"
                  onClick={() => {
                    setSongName(song.name);
                  }}
                >{song.artist}</span>
                <span className="songs-item-album"
                  onClick={() => {
                    setSongName(song.name);
                  }}
                >{song.album}</span>
                <span className="songs-item-time"
                  onClick={() => {
                    setSongName(song.name);
                  }}
                >{getTime(song.time)}</span>
                <div className="songs-item-cancel-button"
                  onClick={() => {
                    handleRemoveSong(song.name)
                  }}
                >
                  <CloseOutlined style={{
                    fontSize: '15px',
                    paddingLeft: '7px',
                    color: 'rgb(160, 160, 160)'
                    }}/>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )

}

export default Songs;