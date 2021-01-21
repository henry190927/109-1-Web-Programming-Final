import './Main.css'
import './Login.css'
import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, message, Tag } from 'antd';
import { BarsOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';

import test_db from './test_db';
import Artists from './components/Artists';
import Albums from './components/Albums';
import Songs from './components/Songs';
import Browse from './components/Browse';
import Search from './components/Search';
import Playlists from './components/Playlists';

import { useQuery, useMutation } from '@apollo/client';
import { 
  APPMUSIC_QUERY,
  DATABASE_QUERY,
  FIND_OR_CREATE_USER_MUTATION,
  APPMUSIC_SUBSCRIPTION,
  REMOVE_SONG_FROM_DB_SUBSCRIPTION,
  ADD_SONG_TO_DB_SUBSCRIPTION,
  ADD_ALBUM_TO_DB_SUBSCRIPTION
} from './graphql';

function MusicPlayer({ songName, AppMusic }) {  
  const song = AppMusic.find(song => song.name === songName);

  const [durationTime, setDurationTime] = useState(0);
  const [progressTime, setProgressTime] = useState(0);
  const [progressWidth, setProgressWidth] = useState('');
  const [isPinMoveing, setIsPinMoving] = useState(false);
  const [playpauseIcon, setPlayPauseIcon] = useState("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/play.svg");
  const [audio, setAudio] = useState(new Audio(song.audio))
  const [localSong, setLocalSong] = useState('');
  
  if (localSong !== songName) {
    audio.pause();
    audio.remove();
    setAudio(null);
    setProgressTime(0);
    setProgressWidth('');
    setPlayPauseIcon("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/play.svg")
    setLocalSong(songName);
    setAudio(new Audio(test_db.song.find(song => song.name === songName).audio));
    audio.currentTime = 0;
  }

  const sliderRef = useRef(null);

  // Updating audio data 
  audio.onloadedmetadata = () => setDurationTime(audio.duration);
  audio.ontimeupdate = () => (!isPinMoveing) ? updateProgress() : null;
  audio.onended = () => {
    setPlayPauseIcon("https://521dimensions.com/img/open-source/amplitudejs/examples/dynamic-songs/play.svg");
    setProgressTime(0);
    setProgressWidth('');
    audio.currentTime = 0;
  }

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
        <img src={song.album_image} className="main-album-art" />
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

function Main({ 
  username, setUsername, setUserpassword, setLoggedIn, 
  clickItem, setClickItem, setSongName, AppMusic, DataBase }) {
  const [BROWSE, SEARCH, ARTISTS, ALBUMS, SONGS, PLAYLISTS, MEDIA] = [0, 1, 2, 3, 4, 5, 6];

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
      case PLAYLISTS:
        setClickItem('Playlists');
        break;
      case MEDIA:
        setClickItem('Media');
        break;
      default:
        setClickItem('Browse');
        break;
    }
  }

  const handleScreen = (screen) => {
    switch (screen) {
      case "Browse":
        return <Browse 
          username={username}
          setSongName={setSongName}
          AppMusic={AppMusic}
        />;
      case "Search":
        return <Search 
          username={username}
          setSongName={setSongName}
          AppMusic={AppMusic}
          DataBase={DataBase}
        />;
      case "Artists":
        return <Artists 
          setSongName={setSongName}
          AppMusic={AppMusic}
          DataBase={DataBase}
        />;
      case "Albums":
        return <Albums 
          username={username}
          setSongName={setSongName}
          AppMusic={AppMusic}
          DataBase={DataBase}
        />;
      case "Songs":
        return <Songs 
          username={username}
          setSongName={setSongName}
          DataBase={DataBase}
        />;
      case "Playlists":
        return <Playlists />;
      case "Media":
        return null;
      default:
        return null;
    }
  }

  return (
    <div className="Main-canvas">
      <div className="Main-menu">
        <div className="Main-notification">
          <span>Welcome,</span>
          <span>{username}!</span>
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
        <div className="Main-playlists" onClick={() => handleClickItem(PLAYLISTS)}>
          <span>Playlists</span>
          <BarsOutlined style={{padding: 10}} />
        </div>
        <div className="Main-media" onClick={() => handleClickItem(MEDIA)}>
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

      <div className="Main-right-panel">
        <div className="Main-header">
          <span>{clickItem}</span>
        </div>
        <div className="Main-screen">
          {handleScreen(clickItem)}
        </div>
      </div>
    </div>
  )
}

function App() {
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  // Define Login state
  const [loggedIn, setLoggedIn] = useState(false);
  // Define side menu click item
  const [clickItem, setClickItem] = useState('Playlists')
  // Define current playing song name 
  const [songName, setSongName] = useState("")

  // Declare User name/password
  const [username, setUsername] = useState('');
  const [userpassword, setUserpassword] = useState('');

  // communicate with back-end
  const query_user_appmusic = useQuery(
    APPMUSIC_QUERY, { variables: { userName: username }}
  );

  const query_user_database = useQuery(
    DATABASE_QUERY, { variables: { userName: username }}
  );

  const query_server = useQuery(
    APPMUSIC_QUERY, { variables: { userName: "henry_the_server" }}
  );

  const [findOrCreateUser] = useMutation(FIND_OR_CREATE_USER_MUTATION);

  const handleUserLogin = async () => {
    if (!username) {
      displayStatus({
        type: 'error',
        msg: 'Please type a valid user name.'
      })
      return 
    }

    if (!userpassword) {
      displayStatus({
        type: 'error',
        msg: 'Please type a valid password.'
      })
      return 
    }

    await findOrCreateUser({
      variables: {
        name: username,
        password: userpassword
      }
    })

    setLoggedIn(true);
  }

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }

  const subscribetoMore_app = query_user_appmusic.subscribeToMore;
  useEffect(() => {
    subscribetoMore_app({
      document: APPMUSIC_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newUser = subscriptionData.data.appmusic.data;

        return {
          ...prev,
          appmusic: [...newUser.appmusic]
        }
      }
    })
  }, [subscribetoMore_app])

  const subscribeToMore_db = query_user_database.subscribeToMore;
  useEffect(() => {
    subscribeToMore_db({
      document: ADD_SONG_TO_DB_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newUser = subscriptionData.data.addsongtodb.data;

        return {
          ...prev,
          database: [...newUser.database]
        }
      }
    })
  }, [subscribeToMore_db])

  useEffect(() => {
    subscribeToMore_db({
      document: REMOVE_SONG_FROM_DB_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newUser = subscriptionData.data.removesongfromdb.data;

        return {
          ...prev,
          database: [...newUser.database]
        }
      }
    })
  }, [subscribeToMore_db])

  useEffect(() => {
    subscribeToMore_db({
      document: ADD_ALBUM_TO_DB_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newUser = subscriptionData.data.addalbumtodb.data;

        return {
          ...prev,
          database: [...newUser.database]
        }
      }
    })
  }, [subscribeToMore_db])

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
              // type="password"
              value={userpassword}
              onChange={(event) => setUserpassword(event.target.value)}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  nameRef.current.focus();
                  if (username && userpassword) {
                    handleUserLogin();
                  }
                }
              }}
            ></Input>
          </div>
          <div className="Login-button">
            <Button 
              disabled={!username || !userpassword}
              onClick={() => {
                if (username && userpassword) {
                  handleUserLogin();
                }
              }}
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
          setSongName={setSongName}
          AppMusic={!query_user_appmusic.data.appmusic.length === 0 ?
            query_user_appmusic.data.appmusic : query_server.data.appmusic}
          DataBase={query_user_database.data.database}
        />
        {songName ? 
        <MusicPlayer 
          songName={songName}
          AppMusic={!query_user_appmusic.data.appmusic.length === 0 ?
            query_user_appmusic.data.appmusic : query_server.data.appmusic}
          DataBase={query_user_database.data.database}
        /> : null}
      </div>
    )
  }
}

export default App
