module.exports = {
  module: {
    rules: [
      {
        test: /\.data$/,
        use: 'arraybuffer-loader'
      },
      {
        test: /score\.js$/,
        enforce: 'post',
        use: {loader: 'obfuscator-loader', options: {/* options here */}}
      },
    ]
  }
};
