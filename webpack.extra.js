const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /\.bfbs$/,
        use: 'unit8array-loader'
      }
    ]
  }
};
