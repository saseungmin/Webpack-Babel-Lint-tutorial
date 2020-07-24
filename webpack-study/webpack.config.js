const path = require("path");

module.exports = {
  mode: "development",
  entry: { // 시작점
    main: "./src/app.js",
  },
  output: { // 두가지 인자가 온다
    path: path.resolve("./dist"), // 아웃풋 디렉토리 명을 입력한다.(절대경로)
    filename: "[name].js", // 번들링된 파일명을 입력한다. [name]: entry에서 설정한 키값(main 이라는 값으로 치환된다.)
  },
  module:{
    rules:[
      // {
      //   test: /\.js$/,   //(.js로 끝나는 모든 파일명을 로더로 돌리겠다.) 로더가 처리해야될 파일들의 패턴을 입력한다. (정규 표현식)
      //   use: [ // 사용할 로더를 명시한다.
      //     path.resolve('./my-webpack-loader.js') // 모든 .js로 끝나는 파일들에서 my-webpack-loader.js가 실행되게끔 설정
      //   ] 
      // }
      {
        test: /\.css$/,
        use:[
           // 웹팩은 엔트리 포인트부터 시작해서 연결된 모든 모듈을 검색하여 css-loader를 찾는다.
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|PNG|gif|svg)$/,
        loader: 'url-loader', // 로더 이름 설정
        options:{ // 로더에 대한 옵션
          // file-loader 처리하는 파일을 모듈로 사용했을 때 그 경로 앞에 추가되는 문자열이다. (아웃풋 경로가 dist로 설정되어 있다.)
          // 파일을 호출할 때 앞에 dist를 붙치고 호출하게 된다.
          publicPath:'./dist/',
          // file-loader  파일 아웃풋으로 복사 할 때 사용하는 파일의 이름을 설정한다.
          // [원본 파일명].[확장자 명]
          // 캐시 무력화를 위해서 쿼리 스트링으로 매번 달라진 해시값을 입력한다.
          name: '[name].[ext]?[hash]' ,
          limit: 80000, // 8kb 파일 크기를 설정할 수 있다.
        }
      }
    ]
  }
};
