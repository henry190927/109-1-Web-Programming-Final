import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
  query UsersQuery {
    users {
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

export const APPMUSIC_QUERY = gql`
  query AppMusicQuery($userName: String!) {
    appmusic(user: $userName) {
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

export const DATABASE_QUERY = gql`
  query DataBaseQuery($userName: String!) {
    database(user: $userName) {
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