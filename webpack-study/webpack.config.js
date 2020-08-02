const path = require("path");
// const MyWebpackPlugin = require('./my-webpack-plugin');
const webpack = require("webpack");
// node 모듈중에 child process는 터미널 명령어를 실행할 수 있다.
const childProcess = require("child_process");
// html Webpack Plugin
const HtmlWebpackPlugin = require("html-webpack-plugin");
// clean webpack plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// mini css extract plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// connect-api-mocker 목업 API
const apiMocker = require("connect-api-mocker");

module.exports = {
  mode: "development",
  entry: {
    // 시작점
    main: "./src/app.js",
  },
  output: {
    // 두가지 인자가 온다
    path: path.resolve("./dist"), // 아웃풋 디렉토리 명을 입력한다.(절대경로)
    filename: "[name].js", // 번들링된 파일명을 입력한다. [name]: entry에서 설정한 키값(main 이라는 값으로 치환된다.)
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
    // 웹팩 개발 서버 객체를 받는다.
    before: (app) => {
      // 미들웨어를 추가하는 형식
      app.use(apiMocker("/api", "mocks/api"));
    },
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,   //(.js로 끝나는 모든 파일명을 로더로 돌리겠다.) 로더가 처리해야될 파일들의 패턴을 입력한다. (정규 표현식)
      //   use: [ // 사용할 로더를 명시한다.
      //     path.resolve('./my-webpack-loader.js') // 모든 .js로 끝나는 파일들에서 my-webpack-loader.js가 실행되게끔 설정
      //   ]
      // }
      {
        test: /\.(scss|css)$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(jpg|PNG|gif|svg)$/,
        loader: "url-loader", // 로더 이름 설정
        options: {
          // 로더에 대한 옵션
          // file-loader 처리하는 파일을 모듈로 사용했을 때 그 경로 앞에 추가되는 문자열이다. (아웃풋 경로가 dist로 설정되어 있다.)
          // 파일을 호출할 때 앞에 dist를 붙치고 호출하게 된다.
          //publicPath:'./dist/',
          // file-loader  파일 아웃풋으로 복사 할 때 사용하는 파일의 이름을 설정한다.
          // [원본 파일명].[확장자 명]
          // 캐시 무력화를 위해서 쿼리 스트링으로 매번 달라진 해시값을 입력한다.
          name: "[name].[ext]?[hash]",
          limit: 80000, // 8kb 파일 크기를 설정할 수 있다.
        },
      },
      {
        test: /\.js$/, // .js로 끝나는 파일
        exclude: /node-modules/, // node-modules에 있는 .js 파일들은 제외시킨다.
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    // 커스텀 플러그인
    // new MyWebpackPlugin()
    // BannerPlugin
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()}
        Commit Version: ${childProcess.execSync("git rev-parse --short HEAD")}
        Author: ${childProcess.execSync("git config user.name")}
        Author-Email: ${childProcess.execSync("git config user.email")}
        `,
    }),
    new webpack.DefinePlugin({
      TWO: "1+1",
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 빈칸 제거
              removeComments: true, // 주석 제거
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [new MiniCssExtractPlugin({ filename: "[name].css" })]
      : []),
  ],
};
