const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
       template: './index.html',
       title: 'Webpack-Plugin',
      }),
      
      new GenerateSW ,
      new WebpackPwaManifest ({
        name: 'J.A.T.E',
        short_name: 'J.A.T.E',
        description: 'Just Another Text Editor',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
      }),

    ],

    module: {
      rules: [ 

        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            }, 
          },  
        },
      ],
    },
  };
};
