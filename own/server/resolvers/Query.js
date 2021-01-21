const Query = {
  users: async (parent, args, { Data }, info) => {
    const result = await Data.find();
    if (!args.query) {
      return result;
    }
  },
  appmusic: async (parent, args, { Data }, info) => {
    if (!args.user) {
      throw new Error('Required Specific User');
    }
    const user = await Data.findOne({ name: args.user }, function(err, res) {
      if (err) return err
    });

    if (!user) return [];

    return user.appmusic;
  },
  database: async (parent, args, { Data }, info) => {
    if (!args.user) {
      throw new Error('Required Specific User');
    }
    const user = await Data.findOne({ name: args.user }, function(err, res) {
      if (err) return err;
    })
    if (!user) return [];

    return user.database;
  }
}

export { Query as default }