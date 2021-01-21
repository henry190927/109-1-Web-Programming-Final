const Mutation = {
  findOrCreateUser: async (parent, args, { Data, pubsub }, info) => {
    const userName = args.data.name;
    const userPassword = args.data.password;
    
    const myServer = await Data.findOne({ name: "henry_the_server" });
    const findUser = await Data.findOne({ name: userName });

    if (!findUser) {
      const newUser = new Data({
        name: userName,
        password: userPassword,
        appmusic: [...myServer.appmusic],
        database: []
      })

      const new_user_create = await newUser.save(function(err, res) {
        if (err) return err;

        pubsub.publish('appmusic', {
          appmusic: {
            mutation:'LOGIN', 
            data: {
              name: userName,
              password: userPassword,
              appmusic: [...myServer.appmusic],
              database: []
            }
          }
        })
      })

      return newUser;
    } else {
      findUser.appmusic = [...myServer.appmusic];

      const find_user_update = await findUser.save(function(err, res) {
        if (err) return err;
      })

      return findUser;
    }
  },
  addSongToDataBase: async (parent, args, { Data, pubsub }, info) => {
    const songName = args.data.name;
    const userName = args.data.user;

    const user = await Data.findOne({ name: userName });

    const songObject = user.appmusic.find(song => song.name === songName);
    const newSong = {
      name: songObject.name,
      artist: songObject.artist,
      album: songObject.album,
      artist_image: songObject.artist_image,
      album_image: songObject.album_image,
      audio: songObject.audio,
      time: songObject.time
    }
    
    if (!user.database.some(song => song.name === newSong.name && song.artist === newSong.artist)) {
      user.database.push(newSong);
    }

    const update_database = await user.save(function(err, res) {
      if (err) return err;

      pubsub.publish('addsongtodb', {
        addsongtodb: {
          mutation: 'ADDSONGTODB',
          data: {
            name: userName,
            password: user.password,
            appmusic: user.appmusic,
            database: user.database
          }
        }
      })
    })

    return newSong;
  },
  removeSongFromDataBase: async (parent, args, { Data, pubsub }, info) => {
    const songName = args.data.name;
    const userName = args.data.user;

    const user = await Data.findOne({ name: userName });

    const songObject = user.database.find(song => song.name === songName);
    const newSongs = user.database.filter(song => song.name !== songName);
    user.database = [...newSongs];

    const update_database = await user.save(function(err, res) {
      if (err) return err;

      pubsub.publish('removesongfromdb', {
        removesongfromdb: {
          mutation: 'REMOVESONGFROMDB',
          data: {
            name: userName,
            password: user.password,
            appmusic: user.appmusic,
            database: user.database
          }
        }
      })
    })

    return songObject;
  },
  addAlbumToDataBase: async (parent, args, { Data, pubsub }, info) => {
    const albumName = args.data.name;
    const userName = args.data.user;

    const user = await Data.findOne({ name: userName });

    const albumSongs = user.appmusic.filter(song => song.album === albumName);
    if (!user.database.some(song => song.album === albumName)) {
      user.database = [...user.database, ...albumSongs];
    }

    const album_update = await user.save(function(err, res) {
      if (err) return err;

      pubsub.publish('addalbumtodb', {
        addalbumtodb: {
          mutation: 'ADDALBUMTODB',
          data: {
            name: userName,
            password: user.password,
            appmusic: user.appmusic,
            database: user.database
          }
        }
      })
    })

    return albumSongs;
  },
  createServer: async (parent, args, { Data }, info) => {
    const serverName = args.data.name;
    const serverPassword = args.data.password;

    const existServer = await Data.findOne({ name: "henry_the_server" });

    if (existServer) {
      return existServer;
    }

    const newServer = new Data({
      name: serverName,
      password: serverPassword,
      appmusic: [],
      database: []
    })

    const new_server_create = await newServer.save(function(err, res) {
      if (err) return err;
    })

    return newServer;
  },
  createAppMusicServer: async (parent, args, { Data }, info) => {
    const myServer = await Data.findOne({ name: "henry_the_server" });
    if (!myServer) {
      throw new Error('Typing wrong input!');
    }

    const song = args.data
    // handle songs
    const newSong = {
      name: song.name,
      artist: song.artist,
      album: song.album,
      artist_image: song.artist_image,
      album_image: song.album_image,
      audio: song.audio,
      time: song.time
    }

    if (!myServer.appmusic.some(song => song.name === newSong.name && song.artist === newSong.artist)) {
      myServer.appmusic.push(newSong);
    }

    const server_appmusice_create = await myServer.save(function(err, res) {
      if (err) return err;
    })

    return newSong;
  },
  clearAll: async (parent, args, { Data }, info) => {
    if (args.user === "henry_the_server") {
      const leftUser = await Data.findOne({ name: args.user });

      const clear_all_data_but_server = await Data.deleteMany({name: { $ne: "henry_the_sesrver"} },
        function(err, res) {
          if (err) return err;
      })

      const newServer = new Data({
        name: leftUser.name,
        password: leftUser.password,
        appmusic: [...leftUser.appmusic],
        database: []
      })

      const left_user_save = await newServer.save(function(err, res) {
        if (err) return err;
      })

      return [newServer];
    }

    const clear_all_data = Data.deleteMany(function(err, res) {
      if (err) return err;
    })

    return [];
  },
  deleteOne: async (parent, args, { Data }, info) => {
    const findUser = await Data.findOne({ name: args.user });
    if (!findUser) {
      throw new Error("Invalid user");
    }

    const delete_one = await Data.deleteOne({name: args.user }, function(err, res) {
      if (err) return err;
    })

    return findUser;
  },
  deleteOneSong: async (parent, args, { Data }, info) => {
    const findServer = await Data.findOne({ name: "henry_the_server" });
    if (!findServer) {
      throw new Error("Invalid server");
    }

    const newSongs = findServer.appmusic.filter(song => song.name !== args.name);
    findServer.appmusic = [...newSongs]

    const delete_one_song = await findServer.save(function(err, res) {
      if (err) return err;
    })

    return findServer;
  },

}

export { Mutation as default }