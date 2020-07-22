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
};
