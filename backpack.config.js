module.exports = {
  webpack(config) {
    // eslint-disable-next-line no-param-reassign
    config.module.rules = [
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ];
    return config;
  },
};
