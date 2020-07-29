# ✔ 웹팩(기본)
> - http://jeonghwan-kim.github.io/series/2019/12/10/frontend-dev-env-webpack-basic.html
> - [웹팩 공식 문서](https://webpack.js.org/concepts/)

<hr/>

### 🌈 1. 로더
### 🌈 2. 플러그인
### 🌈 3. 바벨(babel) & 폴리필(polyfill)

<hr/>

## ✌ 과거의 경우
- html에 파일 두개를 올려서 다른 파일에 있는 함수를 사용했었다.
<pre>
< script src="src/math.js">< /script>
< script src="src/app.js">< /script>
</pre>
#### ❗ 하지만 이런 방법에는 문제가 존재한다.
- 전역 스코프가 오염된다.
- math.js의 sum이라는 함수는 math 모듈 안에서만 유효한 것이 아니라 해당 애플리케이션이 돌아가는 어느 곳에서나 sum 함수에 접근이 가능하다.

![sum](./img/1.PNG)

- 자바스크립트는 이런 함수 타입에다가 다른 값을 할당할 수 있다.

![sum2](./img/2.PNG)
- 이렇게 타입 에러가 발생하게 된다.
- 이렇듯 전역 스코프가 오염되게 되면 애플리케이션이 예측할수 없게 되고 결국엔 런타임 에러가 발생하게 된다.
- 이런 문제를 해결하기 위해서 IIFE 방식의 모듈을 사용을 한다.

## ✌ IIFE 방식의 모듈
- 즉시 실행 함수 표현(IIFE, Immediately Invoked Function Expression)은 정의되자마자 즉시 실행되는 Javascript Function 를 말한다.
- https://developer.mozilla.org/ko/docs/Glossary/IIFE
- 이렇게 되면 함수 안에 독립적인 스코프가 생기게 된다. (외부에서 접근할 수 없다.)
    - 즉, 전역 스코프가 오염되는 문제를 예방할 수 있다.
<pre>
var math = math || {};

(function () {
  function sum(a, b) {
    return a + b;
  }
  // 외부로 호출
  math.sum = sum;
})();
</pre>

![IIFE](./img/3.PNG)

## ✌ 다양한 모듈 시스템
- https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73
- 대표적으로 `AMD` 와 `CommonJS`
- `CommonJS`는 자바스크립트를 사용하는 모든 환경에서 모듈을 하는 것이 목표로 `exports` 키워드로 모듈을 만들고 `require()` 함수로 불러 들이는 방식으로 대표적으로 서버 사이드 플래폼인 Nodejs에서 사용한다.
- 브라우저 환경에서는 [AMD](https://en.wikipedia.org/wiki/Asynchronous_module_definition)(*Asynchronous Module Definition*)는 비동기로 로딩되는 환경에서 모듈을 사용한다. (브라우저처럼 외부자바스크립트를 로딩해야할 때(비동기 환경))
- `CommonJS`와 `AMD`를 보두 지원해주는 것이 `UMD`(*Universal Module Definition*)
- 이렇게 각 커뮤니티에서 각자의 스펙을 제안하자 ES2015에서 표준 모듈 시스템을 내 놓았다.
    - 바벨이나 웹팩을 사용해서 모듈 시스템을 사용하는 것이 일반적이다.
<pre>
// export 할 때
export function sum(a, b) {
  return a + b;
}
// import 할 때
import * as math from "./math.js";
import { sum } from "./math.js";
</pre>

## ✌ 브라우져의 모듈 지원
- 모든 브라우져에서 모듈 시스템을 지원하지 않는다.(explorer..)
- 크롬 브라우저에서 사용할때
<pre>
 < script type="module" src="src/app.js">< /script>
</pre>


## ✌ 엔트리/아웃풋 실습
- https://webpack.js.org/
- app.js에서 math.js를 불러오기 때문에 의존관계가 있다고 표현한다.
#### 📌 웹팩이 하는 역할
- 모듈로 연결된 여러개의 javascript 파일을 하나로 합쳐주는 역할을 한다.
- 이렇게 하나로 합쳐진 파일을 번들(bundle)이라고 한다.
- 웹팩이 번들을 만드는 번들러 역할을 한다. (보통 웹팩을 번들러라고도 부른다.)
<pre>
$ npm i -D webpack webpack-cli
</pre>
- 설치하면 *node-modules*안에 *.bin* 폴더안에 webpack과 webpack-cli가 설치되어있는 것을 확인할 수 있다.
- webpack과 webpack-cli로 웹팩을 터미널에서 실행할 수 있게 된다.
#### 📌 웹팩을 실행할 때 필수적인 옵션 3가지
1. `--mode` 옵션 : [선택: "development", "production", "none"] 3가지 값이 올 수 있다.
    - 개발 환경이냐 운영 환경이냐에 따라서 각각 `development`, `production` 을 설정한다.
2. `--entry` 옵션 : 의존 관계가 있는 모듈들의 시작점을 entry혹은 entry point 라고 한다.
    - 모듈의 시작점을 넣어 주어야한다.
    - 이 entry를 통해서 웹팩의 모든 모듈들을 하나로 합친다.
    - 웹팩은 이 시작점을 기준으로 모든 모듈들을 찾아서 하나의 파일로 번들링 해준다.
3. `--outpout, -o` 옵션 : 그 결과를 저장해야 되는데 저장하는 경로를 설정하는 옵션

- 루트 디렉터리에서 명령어를 치면 웹팩 번들링 결과가 나온다.
<pre>
$ node_modules\.bin\webpack --mode development --entry ./src/app.js --output dist/main.js
</pre>
- dist/main.js 파일이 생겼다.
- index.html에 웹팩으로 번들링된 `dist/main.js`를 불러온다.
<pre>
< script src="dist/main.js">< /script>
</pre>
- 이렇게 되면 모든 브라우저에서 동작하게 된다.
- 결과적으로 웹팩은 여러개의 모듈을 하나의 파일로 만들어주는 역할을 한다.
- 매번 이런식으로 터미널에 긴 명령어를 입력할 수 없기 때문에 웹팩 설정 파일을 만든다.
4. `--config` 옵션 : 웹팩 설정을 지정할 수 있다. 
  -  `[문자열] [기본: webpack.config.js or webpackfile.js]`
  - `webpack.config.js` 파일 생성
<pre>
const path = require("path");

module.exports = {
  mode: "development",
  entry: { // 시작점
    main: "./src/app.js",
    main2: "./src/app2.js" // 예
  },
  output: { // 두 가지 인자가 온다
    path: path.resolve("./dist"), // 아웃풋 디렉토리 명을 입력한다.(절대경로)
    filename: "[name].js", // 번들링된 파일명을 입력한다. [name]: entry에서 설정한 키 값(main 이라는 값으로 치환된다.)
  },
};
</pre>
- `filename: "[name].js"` 이런 방식으로 하면 동적으로 파일 이름을 지정할 수 있게 된다.
- 웹팩으로 코드를 번들링하는 과정을 npm script에 등록한다.
<pre>
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    <b>"build": "webpack"</b>
  },
</pre>
- npm은 현재 프로젝트에 있는 node모듈을 찾아서 기본 파일 이름인 `webpack.config.js`을 읽어서 `webpack`으로 적는 것이 가능하여 웹팩 번들링 작업을 하게 된다.
<pre>
$npm run build
</pre>
- 터미널에 명령어를 입력했을 때랑 똑같은 결과가 나온다.

![webpack](./img/4.PNG)