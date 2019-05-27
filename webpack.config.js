const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const packageJson = require('./package.json');


module.exports = {
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
  context: path.join(__dirname, 'src'),
  entry: {
    module: './module.ts',
  },
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: 'amd',
  },
  externals: [
    'antd',
    'cleanslate',
    'lodash',
    'moment',
    'react',
    'react-dom',
    '@grafana/ui',

    function(context, request, callback) {
      if(request.indexOf('ReactPropTypesSecret') >= 0) {
        return callback(); //
      }

      // The plotly.min.js
      if (request.indexOf('./lib/') === 0) {
        console.log( 'SKIP', request );
        return callback(null, request);
      }

      // if( request.indexOf('@ant-design')>=0 ) {
      //   console.log( 'SKIP', request );
      //   return callback(null, request);
      // }

      callback();
    },
  ],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin([
      { from: 'plugin.json', to: '.' },
      { from: '../README.md', to: '.' },
      { from: 'img/*', to: '.' },
      { from: '../node_modules/antd/dist/', to: 'lib' },
      { from: '../node_modules/cleanslate/cleanslate.css', to: 'lib' },
    ]),
    new ReplaceInFileWebpackPlugin([
      {
        dir: 'dist',
        files: ['plugin.json', 'README.md'],
        rules: [
          {
            search: '%VERSION%',
            replace: packageJson.version,
          },
          {
            search: '%TODAY%',
            replace: new Date().toISOString().substring(0, 10),
          },
        ],
      },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /node_modules\/.*\.less$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "less-loader",
            options: {
                javascriptEnabled: true,
                sourceMap: true,
                modifyVars: {
                  "@primary-color": "#FF0000",
                },
            }
        }]
      },
    ],
  },
};
