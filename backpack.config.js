module.exports = {
  webpack: config => {
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
