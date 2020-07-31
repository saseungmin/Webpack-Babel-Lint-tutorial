# ✌ 웹팩(심화)
> https://jeonghwan-kim.github.io/series/2020/01/02/frontend-dev-env-webpack-intermediate.html
## 🌈 웹팩 개발 서버
- 프론트 엔드 개발환경에서 개발 서버를 제공해 주는 것이  [webpack-dev-server](https://webpack.js.org/configuration/dev-server/)이다.
- 패키지 설치
<pre>
$ npm i webpack-dev-server
</pre>
- `package.json`에 `script`에 추가
<pre>
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "lint": "eslint src --fix",
    <b>"start": "webpack-dev-server"</b>
  },
</pre>
- `$ npm start`를 하면 `webpack-dev-server`가 실행된다.