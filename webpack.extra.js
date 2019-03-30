module.exports = {
  module: {
    rules: [
      {
        test: /\.data$/,
        use: 'arraybuffer-loader'
      }
    ]
  }
};
