var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          type: 'javascript/auto',
          test: /\.json$/,
          use: [
              {
                loader: 'file-loader',
                options: {
                    name: "./assets/[name].[ext]"
                }
              }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Pixtris',
    }),
    new CopyPlugin([
      { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets') },
    ])
  ],
  devtool: 'source-map'
};
