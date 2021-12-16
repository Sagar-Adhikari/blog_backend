export const mongoDBConfig = {
  options: {
    /**
     * Why are we using these `options`?
     * Because if we didn't, the console keeps
     * complaining that we didn't use these options.
     * However, these options are optional
     */
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  },
  collectionName: {
    comment: 'Comment',
    user: 'User',
    item: 'Item',
    blog: 'Blog',
  },
};
