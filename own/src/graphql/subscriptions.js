import { gql } from '@apollo/client';

export const APPMUSIC_SUBSCRIPTION = gql`
  subscription {
    appmusic {
      mutation
      data {
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
  }
`;

export const ADD_SONG_TO_DB_SUBSCRIPTION = gql`
  subscription {
    addsongtodb {
      mutation
      data {
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
  }
`;

export const REMOVE_SONG_FROM_DB_SUBSCRIPTION = gql`
  subscription {
    removesongfromdb {
      mutation
      data {
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
  }
`;

export const ADD_ALBUM_TO_DB_SUBSCRIPTION = gql`
  subscription {
    addalbumtodb {
      mutation
      data {
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
  }
`;