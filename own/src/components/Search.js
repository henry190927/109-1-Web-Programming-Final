import React, { useEffect, useRef, useState } from 'react';
import './Components.css';
import './SubComponents.css';

import { Input } from 'antd';
import { ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import Artist from './Artist';
import Album from './Album';

const Search = ({ username, setSongName, AppMusic, DataBase }) => {
  // const songs = test_db.song;
  const [searchinput, setSearchInput] = useState("");
  const [onsearch, setOnSearch] = useState(false)
  const [searchmode, setSearchMode] = useState("AppMusic");
  const [isSelected, setIsSelected] = useState(false);
  const [albumselected, setAlbumSelected] = useState(null);
  const [artistselected, setArtistSelected] = useState(null);

  const appMusicRef = useRef(null);
  const yourDatabaseRef = useRef(null);
  
  // handle data searching / filtering 
  const songs = searchmode === "AppMusic" ? 
  AppMusic.filter(song => 
    song.artist.includes(searchinput) || 
    song.album.includes(searchinput) || 
    song.name.includes(searchinput)
  ) : searchmode === "YourDatabase" ? 
  DataBase.filter(song => 
    song.artist.includes(searchinput) || 
    song.album.includes(searchinput) || 
    song.name.includes(searchinput)
  ) : null; 

  // filter out artists
  let artists = []
  songs.map(song => {
    if (!artists.some(s => song.artist === s.artist)) {
      artists.push(song)
    }
  })

  // filter out albums
  let albums = []
  songs.map(song => {
    if (!albums.some(s => song.album === s.album)) {
      albums.push(song);
    }
  })

  const switchModeStyle = (clickRef, otherRef) => {
    clickRef.current.style.backgroundColor = '#5e717a';
    otherRef.current.style.backgroundColor = '#031f2b';
  }

  return (
    <div className="search-container">
      {(!onsearch && !isSelected) ? 
        <div className="search-bar-container">
          <div className="search-bar">
            <Input.Search 
              placeholder="Type any artist/album/song..."
              value={searchinput}
              onChange={(event) => setSearchInput(event.target.value)}
              onSearch={() => setOnSearch(true)}
            />
          </div>
        </div> 
        : (onsearch && !isSelected) ? 
        <div className="result-container">

          <div className="result-header">
            <div className="back-container"
            onClick={() => {
              setSearchInput("");
              setOnSearch(false);
            }} >
              <ArrowLeftOutlined style={{
                marginTop: '18px', 
                marginLeft: '10px',
                color: 'rgb(200, 200, 200)'
              }}/>
            </div>
            <div className="blank"></div>
            <div className="mode-container" ref={appMusicRef}
              style={{backgroundColor: '#5e717a'}}
              onClick={() => {
                switchModeStyle(appMusicRef, yourDatabaseRef);
                setSearchMode("AppMusic");
              }}  
            >
              <span>App Music</span>
            </div>
            <div className="mode-container" ref={yourDatabaseRef}
              onClick={() => {
                switchModeStyle(yourDatabaseRef, appMusicRef);
                setSearchMode("YourDatabase");
              }}
            >
              <span>Your Database</span>
            </div>
          </div>

          <div className="result-content">
            <div className="artists">
              <div className="header">
                <span>Artists</span>
              </div>
              <div className="item-container">
                {artists.map((song, index) => {
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
            
            <div className="albums">
              <div className="header">
                <span>Albums</span>
              </div>
              <div className="albums-container">
                {albums.map((song, index) => {
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

            <div className="songs">
              <div className="header">
                <span>Songs</span>
              </div>
              <div className="songs-container">
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
          </div>
        </div> 
        : (onsearch && isSelected) ? 
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
          <span className="back-info">Back to result</span>
        </div>
      : null}
      {albumselected ? 
        <Album 
          username={username}
          setSongName={setSongName}
          album={albumselected}
          AppMusic={AppMusic}
        />
      : artistselected ? 
        <Artist 
          setSongName={setSongName}
          artist={artistselected}
          AppMusic={AppMusic}
        />
      : null}
    </div>
  )
}

export default Search;