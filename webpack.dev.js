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
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader', 
        options : {
          name: "[name][hash].[ext]",
          outputPath: "assets",
          publicPath: "assets",
        }
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },           
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
    // plugins: [
    //   new CleanWebpackPlugin(),
    //   new CopyPlugin({
    //     patterns: [
    //       { from: "./src/service-worker.js", to: "./" },
    //       { from: "./web.config", to: "./" },
    //       { from: "./src/static/sample.json", to: "./" }
    //     ],
    //   }),
    //   //  new BundleAnalyzerPlugin({
    //   //    analyzerMode: "static",
    //   // })
    // ],
    // optimization: {
    //   splitChunks: {
    //     cacheGroups: {
    //       commons: {
    //         test: /[\\/]node_modules[\\/]/,
    //         name: 'vendor',
    //         chunks: 'all',
    //       },
    //     },
    //   },
    // },
  }