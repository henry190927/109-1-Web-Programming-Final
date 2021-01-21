import { gql } from '@apollo/client';

export const FIND_OR_CREATE_USER_MUTATION = gql`
  mutation FindOrCreateUser(
    $name: String!
    $password: String!
  ) {
    findOrCreateUser(
      data: {
        name: $name
        password: $password
      }
    ) {
      name
      password
      appmusic {
        name
        artist
        album
        artist_image
        album_image
        audio
        time
      }
      database {
        name
        artist
        album
        artist_image
        album_image
        audio
        time
      }
    }
  }
`;

export const ADD_SONG_TO_DATABASE = gql`
  mutation AddSongToDataBase(
    $name: String!
    $user: String!
  ) {
    addSongToDataBase (
      data: {
        name: $name
        user: $user
      }
    ) {
      name
      artist
      album
      artist_image
      album_image
      audio
      time
    }
  }
`;

export const REMOVE_SONG_FROM_DATABASE = gql`
  mutation RemoveSongFromDataBase(
    $name: String!
    $user: String!
  ) {
    removeSongFromDataBase (
      data: {
        name: $name
        user: $user
      }
    ) {
      name
      artist
      album
      artist_image
      album_image
      audio
      time
    }
  } 
`;

export const ADD_ALBUM_TO_DATABASE = gql`
  mutation AddAlbumToDataBase(
    $name: String!
    $user: String!
  ) {
    addAlbumToDataBase (
      data: {
        name: $name
        user: $user
      }
    ) {
      name
      artist
      album
      artist_image
      album_image
      audio
      time
    }
  }
`;