import './Main.css'
import './Login.css'
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, message, Tag } from 'antd';
import { BarsOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';

import test_db from './test_db';

// import { useQuery, useMutation } from '@apollo/client';
// import { 
//   MESSAGES_QUERY,
//   CREATE_MESSAGE_MUTATION,
//   FIND_OR_CREATE_USER_MUTATION,
//   CLEAN_USER_MESSAGE_MUTATION,
//   CLEAN_SUBSCRIPTION,
//   MESSAGE_SUBSCRIPTION
// } from './graphql';

function MusicPlayer() {  
  const [durationTime, setDurationTime] = useState(0);
  const [progressTime, setProgressTime] = useState(0);
  const [progressWidth, setProgressWidth] = useState('');
  const [isPinMoveing, setIsPinMoving] = useState(false);
  const [playpauseIcon, setPlayPauseIcon] = useState("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/play.svg")

  const song = test_db.song.find(song => song.artist === "持修");
  const audio = song.audio;
  
  // Updating audio data 
  audio.onloadedmetadata = () => setDurationTime(audio.duration);
  audio.ontimeupdate = () => (!isPinMoveing) ? updateProgress() : null;
  audio.onended = () => {
    setPlayPauseIcon("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/play.svg");
    setProgressTime(0);
    setProgressWidth('');
    audio.currentTime = 0;
  }

  const sliderRef = useRef(null);

  const handlePinMove = () => {
    if (isPinMoveing) {
      window.addEventListener("mousemove", pinMoving, false);
      window.addEventListener("mouseup", (event) => handlePinUp(event), false);
    }
    window.removeEventListener("mouseup", (event) => handlePinUp(event), false);
  }

  const getTime = (timeload) => {
    let min = Math.floor(timeload / 60);
    let sec = Math.floor(timeload % 60);

    if (sec < 10) {
      return min + ':0' + sec; 
    }
    return min + ':'+ sec;
  }

  const getCoefficient = (event) => {
    let screenOffset = document.querySelector('.MusicPlayer').offsetLeft+38;
    let K = 0;
    let offsetX = event.clientX - screenOffset;
    let width = sliderRef.current.clientWidth;

    K = offsetX / width;

    return (K > 0) ? K : 0;
  }

  const pinMoving = (event) => {
    setProgressTime(durationTime * getCoefficient(event))
    setProgressWidth(getCoefficient(event)*100+'%');
  }

  const handlePinUp = (event) => {
    setIsPinMoving(false);
    window.removeEventListener("mousemove", pinMoving, false);
  }

  const updateProgress = () => {
    let current = Math.floor(audio.currentTime);
    let percent = (current / audio.duration) * 100;

    setProgressTime(current);
    setProgressWidth(percent+'%');
  }

  return (
    <div className="MusicPlayer" id="music-player">
      <div className="player-header">
        <span>Now Playing</span>
      </div>
      <div className="player-center">
        <img src={song.image} className="main-album-art" />
        <div className="song-meta-data">
          <span className="song-name">{song.name}</span>
          <span className="song-artist">{song.artist}</span>
        </div>
        
        <div className="timeline" >
          <div className="slider" data-direction="horizontal" 
            ref={sliderRef}
            onClick={(event) => {
              setProgressTime(durationTime * getCoefficient(event));
              setProgressWidth(getCoefficient(event)*100+'%');
              audio.currentTime = durationTime * getCoefficient(event);
            }}
          >
            <div className="progress" style={{width: progressWidth}}>
              <div 
                className="pin-button" 
                id="progress-pin"
                data-method="rewind"
                onMouseDown={() => setIsPinMoving(true)}
              >{handlePinMove()}</div>
            </div>
          </div>
          <span id="progress-time">{getTime(progressTime)}</span>
          <span id="duration-time">{getTime(durationTime)}</span>
        </div>
      </div>

      <div className="player-controls">
        <div id="previous"></div>
        <div className="play-pause" 
          style={{backgroundImage: `url(${playpauseIcon})`}}
          onClick={() => {
          if (audio.paused) {
            audio.play();
            setPlayPauseIcon("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/pause.svg");
          } else {
            audio.pause();
            setPlayPauseIcon("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/play.svg");
          }
        }}></div>
        <div id="next"></div>
      </div>
    </div>
  )
}

function Main({ username, setUsername, setUserpassword, setLoggedIn, clickItem, setClickItem }) {
  const [BROWSE, SEARCH, ARTISTS, ALBUMS, SONGS] = [0, 1, 2, 3, 4];

  const handleClickItem = (clickItem) => {
    switch (clickItem) {
      case BROWSE:
        setClickItem('Browse');
        break;
      case SEARCH:
        setClickItem('Search');
        break;
      case ARTISTS:
        setClickItem('Artists');
        break;
      case ALBUMS:
        setClickItem('Albums');
        break;
      case SONGS:
        setClickItem('Songs');
        break;
      default:
        setClickItem('Browse');
        break;
    }
  }

  return (
    <div className="Main-canvas">
      <div className="Main-menu">
        <div className="Main-notification">
          Welcome, {username}!
        </div>
        <div className="Main-genre">
          App Music
          <ul>
            <li
              onClick={() => handleClickItem(BROWSE)}
            >Browse</li>
            <li
              onClick={() => handleClickItem(SEARCH)}
            >Search</li>
          </ul>
        </div>
        <div className="Main-genre">
          Your Database
          <ul>
            <li
              onClick={() => handleClickItem(ARTISTS)}
            >Artists</li>
            <li
              onClick={() => handleClickItem(ALBUMS)}
            >Albums</li>
            <li
              onClick={() => handleClickItem(SONGS)}
            >Songs</li>
          </ul>
        </div>
        <div className="Main-playlists">
          <span>Playlists</span>
          <BarsOutlined style={{padding: 10}} />
        </div>
        <div className="Main-media">
          <span>Media</span>
          <TeamOutlined style={{padding: 10}} />
        </div>
        <div 
          className="Main-logout"
          onClick={() => {
            setUsername("");
            setUserpassword("");
            setLoggedIn(false);
          }}
        >
          <span>Logout</span>
          <LogoutOutlined style={{padding: 10}} />
        </div>
      </div>
      <div className="Main-header">
        <span>{clickItem}</span>
      </div>
    </div>
  )
}

function App() {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  // Define Login state
  const [loggedIn, setLoggedIn] = useState(true);
  // Define side menu click item
  const [clickItem, setClickItem] = useState('Browse')

  // Declare User name/password
  const [username, setUsername] = useState('Henry');
  const [userpassword, setUserpassword] = useState('');

  if (!loggedIn) {
    return (
      <div className="Login-background">
        <div className="Login-left">
          <div className="Login-title">
            <h1>Musify</h1>
          </div>
          <div className="Login-text">
            <span>Enjoy nice tunes</span>
            <span>Share with friends</span>
            <span>Arrange your own music</span>
          </div>
        </div>
        <div className="Login-right">
          <div className="Login-input">
            <Input 
              placeholder="Name..."
              ref={nameRef}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  passwordRef.current.focus();
                }
              }}
            ></Input>
          </div>
          <div className="Login-input">
            <Input
              placeholder="Password..."
              ref={passwordRef}
              type="password"
              value={userpassword}
              onChange={(event) => setUserpassword(event.target.value)}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  nameRef.current.focus();
                  if (username && userpassword) {
                    setLoggedIn(true);
                  }
                }
              }}
            ></Input>
          </div>
          <div className="Login-button">
            <Button 
              disabled={!username || !userpassword}
            >Log In</Button>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="Login-background">
        <Main 
          username={username}
          setUsername={setUsername}
          setUserpassword={setUserpassword}
          setLoggedIn={setLoggedIn}
          clickItem={clickItem}
          setClickItem={setClickItem}
        />
        <MusicPlayer />
      </div>
    )
  }
}

export default App
