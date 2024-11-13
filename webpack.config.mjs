import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import webpack from "webpack";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: "./index.js", // The main JS file
  output: {
    filename: "bundle.js", // The bundled file output
    path: resolve(__dirname, "./dist"), // Output folder for the bundle,
    publicPath: "/",
  },
  mode: "development", // Development mode for unminified output
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  plugins: [
    // fix "process is not defined" error:
    // (do "npm install process" before running the build)
    new webpack.DefinePlugin({
      "process.env": JSON.stringify("development"),
    }),
  ],
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    magicHtml: true,
    historyApiFallback: {
      index: "index.html",
    },
  },
  resolve: {
    modules: [resolve(__dirname, "node_modules")],
  },
};
