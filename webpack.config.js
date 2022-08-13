const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');


module.exports = merge({}, {
  mode: 'development',
  entry: {
    render: './src/render.tsx',
    httpServer: './src/httpServer.ts',
    main: './src/main.ts',
    preload: './src/preload.ts',
  },
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      excludeChunks: ['main', 'httpServer', 'preload']
    }),
    new CleanWebpackPlugin()
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: false,
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?/i,
        use: [
          'ts-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
});