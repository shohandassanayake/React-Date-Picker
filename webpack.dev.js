const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: false,
  mode: 'development',
  entry: {    
    main : './src/index.tsx'
  }, 
  output: {
    filename: '[name].bundle.[contenthash].js',
    path: path.join(__dirname, 'dist'),
    clean: true
  },   
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 7000,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
  },
  module: {
    rules: [       
      {
          test: /\.tsx|ts|js|jsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
      },      
      {
        test: /\.html$/,
        use: ['html-loader']          
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader', 
        options : {
          name: "[name][hash].[ext]",
          outputPath: "assets",
          publicPath: "assets",
        }
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      }       
    ]
  },
  plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css'
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })     
  ],
  optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
          },
        },
      },
    },
  }