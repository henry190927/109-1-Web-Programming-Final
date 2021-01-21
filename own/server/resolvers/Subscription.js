const Subscription = {
  appmusic: {
    subscribe: async (parent, args, { pubsub }, info) => {
      const appmusic = await pubsub.asyncIterator('appmusic');
      return appmusic;
    }
  },
  addsongtodb: {
    subscribe: async (parent, args, { pubsub }, info) => {
      const addsongtodb = await pubsub.asyncIterator('addsongtodb');
      return addsongtodb;
    }
  },
  removesongfromdb: {
    subscribe: async (parent, args, { pubsub }, info) => {
      const removesongfromdb = await pubsub.asyncIterator('removesongfromdb');
      return removesongfromdb;
    }
  },
  addalbumtodb: {
    subscribe: async (parent, args, { pubsub }, info) => {
      const addalbumtodb = await pubsub.asyncIterator('addalbumtodb');
      return addalbumtodb;
    }
  }
}

export { Subscription as default }