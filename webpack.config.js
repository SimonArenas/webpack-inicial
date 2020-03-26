const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const copyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin()] //Solo sirve si está en 'production'
  },
  module: {
    rules: [
      {
        test: /\.css$/, //*Cualquier archivo que finalice con .css*
        exclude: /styles\.css$/,
        use: [
          "style-loader", //Style-loader inyecta el codigo CSS
          "css-loader"
        ] //Style-loader solo interpreta el codigo CSS
      },

      {
        test: /styles\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },

      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          attributes: false,
          minimize: false //En caso que queramos minimizarlo
        }
      },

      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      ignoreOrder: false
    }),
    new copyPlugin([
      {
        from: "src/assets",
        to: "assets/"
      }
    ])
  ]
};
