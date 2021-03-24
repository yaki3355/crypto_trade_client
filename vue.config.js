const path = require('path');

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: path.resolve('../public'),
  devServer: {
    proxy: {
      "/": {
        target: "http://localhost:3000"
      }
    }
  }
}
