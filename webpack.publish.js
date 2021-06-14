const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {    
        main : './src/pages/date-picker/date-picker.tsx'
      }, 
    output: {
      filename: 'aqua-ui-react-date-picker.js',
      path: path.join(__dirname, 'dist'),
      clean: true,
      libraryTarget: 'commonjs2'
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
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
              test: /\.(scss|css)$/,
              use: [
                'style-loader',
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
    externals: {
        // Don't bundle react or react-dom      
        react: {
          commonjs: "react",
          commonjs2: "react",
          amd: "React",
          root: "React"
        },
        "react-dom": {
          commonjs: "react-dom",
          commonjs2: "react-dom",
          amd: "ReactDOM",
          root: "ReactDOM"
        }
      }
}