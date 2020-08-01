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

#### 📌 `webpack-dev-server`로 실행하는 도중 아래와 같은 오류가 계속 발생하였다.

![gg](./img/24.PNG)

- 처음에는 ESLint 때문에 그런줄 알았는데 인터넷에 검색해본 결과 `Uncaught TypeError: Cannot assign to read only property 'exports' of object '#<Object>'` 오류는 명확하게 답이 나와있지 않았다.
- 그냥 `import`와 `require`같은 commonJS와 ES6를 같이 사용해서 그렇다고 나와있었다.
> https://github.com/webpack/webpack/issues/4039

- *module.exportsES 모듈 내에서 CommonJS 스타일을 사용하려고 할 때만 발생했습니다.*
- 그래서 한참을 찾았는데 문제는 babel에 있었다.
- 같이 사용하게 해야되기때문에 `babel.config.js`를 수정해주어야만 했다.
- 처음 찾은 것은 babel의 `sourceType`을 `unambiguous`롤 수정해주어 같이 사용하게 하는 방법이였다.
> https://babeljs.io/docs/en/options#sourcetype
<pre>
sourceType: "unambiguous",
  presets: [
    ...
  ]
</pre>
- `@babel/preset-env`를 사용한 `corejs` 폴리필을 사용하기 때문에 옵션인 `useBuiltIns`을 사용하여 같이 사용하게 하는 방법이였다.
- `useBuiltIns`을 `entry`로 변경해주었다.
- https://babeljs.io/docs/en/babel-preset-env#usebuiltins
