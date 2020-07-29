## ✌ 바벨(babel)
- 바벨이란 일관적인 방식으로 코딩하면서, 다양한 브라우저에서 돌아가는 애플리케이션을 만들기 위한 도구이다.
- 바벨의 코어는 파싱과 출력만 담당하고 변환작업은 플러그인이 처리한다.

### 🔸 크로스 브라우징
- 브라우저에서 사용하는 언어가 조금씩 다르다. 따라서 프론트엔드 코드는 일관적이지 못할 때가 많다.
- 여전히 인터넷 익스플로러는 프라미스를 이해하지 못한다.
- 이렇듯 크로스브라우징의 혼란을 해결해 줄 수 있는 것이 바벨이다.
- **ECMAScript2015+로 작성한 코드를 모든 브라우저에서 일관되게 동작하도록 호환성을 지켜준다.**
- 타입스크립트, JSX처럼 다른 언어로 분류되는 것도 포함한다.

### 🔸 바벨의 기본 동작
- 바벨 설치
<pre>
$ npm i @babel/core @babel/cli
</pre>
- 프로젝트 루트 디렉토리에 `app.js` 생성
<pre>
const alert = msg => window.alert(msg);
</pre>
- npx로 실행할시 바로 실행할 수 있다.
<pre>
$ npx babel app.js
// 작성한 결과가 나온다.
> const alert = msg => window.alert(msg);
</pre>
- 바벨이 코드를 변환하는 작업을 빌드라고 하는데 세 단계로 빌드를 진행한다.
  1. 파싱(Parsing) : 코드를 받아서 각 토큰별로 분해한다.(const, alert 이런식으로 분해)
  2. 변환(Transforming) : ES6로 되어있는 코드를 ES5로 변환
  3. 출력(Printing) : 변환된 결과를 출력

- 결과상에는 코드가 변환되지 않았다.

### 🔸 플러그인(변환을 담당)
#### 🌈 커스텀 플러그인
- `my-babel-plugin.js`에 작성 후 실행하면 `app.js`가 파싱이 일어난게 콘솔에 찍힌다.
<pre>
$ npx babel app.js --plugins './my-babel-plugin.js' 
> Identifier() name :  alert
> Identifier() name :  msg
> Identifier() name :  window
> Identifier() name :  alert
> Identifier() name :  msg
> const alert = msg => window.alert(msg);
</pre>
- `my-babel-plugin.js`의 변환 작업
<pre>
// 변환작업 : 코드 문자열을 역순으로 변환한다.
path.node.name = name.split('').reverse().join('');
// 다시 실행하면 역순으로 뒤집힌것을 볼 수 있다.
$ npx babel app.js --plugins './my-babel-plugin.js'
...
> const trela = gsm => wodniw.trela(gsm);
</pre>
- `my-babel-plugin.js` 수정하여 ES6문법 const를 ES5 var로 변환시킨다.
<pre>
// const면 var로 치환해버린다.
VariableDeclaration(path){
    console.log('VariableDeclaration() kind: ', path.node.kind); // const
    // const => var ES5로 변환
    if(path.node.kind === 'const'){
        path.node.kind = 'var'
    }
}
</pre>
- babel 실행
<pre>
$ npx babel app.js --plugins './my-babel-plugin.js'
> VariableDeclaration() kind:  const
> var alert = msg => window.alert(msg);
</pre>

#### 🌈 플러그인 사용하기
- 커스텀 플러그인과 같이 이러한 결과를 만드는 것이 [`block-scoping`](https://babeljs.io/docs/en/babel-plugin-transform-block-scoping) 플러그인이고, 실제 바벨에서 제공하는 플러그인이다.
- `const`, `let` 처럼 블록 스코핑을 따르는 예약어를 함수 스코핑을 사용하는 `var` 변경한다.
- `@babel/plugin-transform-block-scoping` 패키지 설치
<pre>
$ npm i @babel/plugin-transform-block-scoping
</pre>
- babel 실행
<pre>
$ npx babel app.js --plugins @babel/plugin-transform-block-scoping 
> var alert = msg => window.alert(msg);
</pre>
- 콘솔에 확인해보면 커스텀 플러그인 결과와 똑같이 `const`가 `var`로 변환된것을 확인할 수 있다.
- app.js에 있는 함수는 `const`에서 `var`로 변환되서 ex에서 실행이 가능하지만, arrow 함수는 explorer에서 또한 실행되지 않는다.
- 그렇기 때문에 [`@babel/plugin-transform-arrow-functions`](https://babeljs.io/docs/en/babel-plugin-transform-arrow-functions) 패키지를 사욯해 변환시켜준다.
<pre>
$ npm i @babel/plugin-transform-arrow-functions
</pre>
- babel 실행 후 확인해보면 arrow 함수가 일반 함수로 바뀌었다.
<pre>
$ npx babel app.js --plugins @babel/plugin-transform-block-scoping --plugins @babel/plugin-transform-arrow-functions
// 실행 결과
var alert = function (msg) {
  return window.alert(msg);
};
</pre>

- ESMAScripts5에서부터 지원하는 엄격 모드를 사용하는 것이 안전하기 때문에 `"use strict"` 구문을 추가하는 것이 좋다.
- 이러한 구문을 넣어주는 바벨이 [strict-mode](https://babeljs.io/docs/en/babel-plugin-transform-strict-mode) 플러그인이다.
<pre>
$ npm i @babel/plugin-transform-strict-mode
</pre>
- babel 실행 후 콘솔을 확인해보면 `"use strict"` 가 붙어있는 것을 확인할 수 있다.
<pre>
$ npx babel app.js --plugins @babel/plugin-transform-block-scoping --plugins @babel/plugin-transform-arrow-functions --plugins @babel/plugin-transform-strict-mode
// 실행 결과
"use strict";

var alert = function (msg) {
  return window.alert(msg);
};
</pre>

- 플러그인이 많아지면 많아질수록 콘솔에 적을 명령어들이 많아진다.
- 그렇기 때문에 웹팩 설정 파일인 `webpack.config.js`를 기본 설정파일로 사용하듯 바벨도 `babel.config.js`를 사용한다.
- `babel.config.js`에 콘솔에 적은 바벨들을 plugins 배열에 적어준다.
<pre>
module.exports = {
    plugins: [
        "@babel/plugin-transform-block-scoping",
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-transform-strict-mode"
    ]
}
</pre>
- 작성한 뒤 babel 실행 plugins 옵션을 사용하지 않고 실행하도 기본적으로 `babel.config.js` 설정파일이 잡혀있기 때문에 알아서 plugins를 적용하고 결과를 출력해준다.
<pre>
$ npx babel app.js
// 실행 결과
"use strict";

var alert = function (msg) {
  return window.alert(msg);
};
</pre>

- 하지만 이 경우도 하나하나 일일히 plugin을 설정할려면 너무 많아지기 때문에 **프리셋**을 사용한다.

### 🔸 프리셋
- 위처럼 코드를 한줄만 작성하였는데도 불구하고 plugins에 3개의 plugin이 설정되어 있다.
- 목적에 맞게 여러가지 플러그인을 세트로 모아놓은 것을 **프리셋**이라고 한다.

#### 🌈 커스텀 프리셋
- 위에서 사용한 3개의 플러그인을 하나의 프리셋으로 만든다.
- 아래의 형태가 플러그인을 모아놓은 하나의 세트이다.
<pre>
module.exports = function myBabelPreset(){
    return{
        plugins: [
            "@babel/plugin-transform-block-scoping",
            "@babel/plugin-transform-arrow-functions",
            "@babel/plugin-transform-strict-mode"
        ]
    }
}
</pre>
- `babel.config.js`에 설정된 `plugins`대신 `presets`라는 배열로 `my-babel.preset.js`의 `plugin`들을 불러온다.
<pre>
module.exports = {
    presets: [
        './my-babel-preset.js'
    ]
}
</pre>
- 설정 후 `npx babel app.js ` 빌드하면 같은 결과가 나오는 것을 확인할 수 있다.
<pre>
// 빌드 결과
"use strict";

var alert = function (msg) {
  return window.alert(msg);
};
</pre>

#### 🌈 프리셋 사용하기
- 바벨은 목적에 따라 프리셋을 제공한다.
- 이렇게 사용하는 것이 실무에서 많이 사용한다.

> - preset-env : ECMAScript5+를 변환할 때 사용한다.
> - preset-flow : flow를 변환하기 위한 프리셋이다.
> - preset-react : react를 변환하기 위한 프리셋이다.
> - preset-typescript : typescript를 변환하기 위한 프리셋이다.

#### ✌️ preset-env
- 인터넷 익스플로러 지원을 위해 `env` 프리셋을 사용한다.
- 패키지를 설치한다
<pre>
$ npm i @babel/preset-env
</pre>
- `babel.config.js`에 `@babel/preset-env`를 `presets`에 설정해준다.
<pre>
module.exports = {
    presets: [
        '@babel/preset-env'
    ]
}
</pre>
- 설정 후 `npx babel app.js ` 빌드하면 같은 결과가 나오는 것을 확인할 수 있다.
<pre>
// 빌드 결과
"use strict";

var alert = function (msg) {
  return window.alert(msg);
};
</pre>


### 🔸 env 프리셋 설정과 폴리필
####  🌈 타겟 브라우저
- 프리셋을 설정할 때 특정 브라우저를 지원해야되야 만하는 설정흘 할 수 있다.
- `target` 옵션에 브라우저 버전명만 지정하면 `env`프리셋은 이에 맞는플러그인들을 찾아 최적의 코드를 출력해 낸다.
- `babel.config.js`를 수정한다
<pre>
module.exports = {
    presets: [
        // 첫 번째 인자는 프리셋 이름을 정하고, 두 번째 인자는 target 옵션 객체 인자를 전달한다.
        ['@babel/preset-env', {
            targets: {
                chrome: '79' // chrome 79 에서 실행되는 코드로 변환.
            }
        }]
    ]
}
</pre>
- 설정 후 `npx babel app.js ` 빌드하면 같은 결과를 확인하면 위와 다르게 엄격 모드는 되어있지만, ECMAScript5+ 언어로 되어있다.
- chrome 79에서는 `const`와 `arrow function`언어를 이해하고 있기 바벨 프리셋이 굳이 변환시키지 않았다.
- [`CanIUse`](https://caniuse.com/) 사이트에서 브라우저 호환성을 볼 수 있다.
- 두 가지 이상의 브라우저에서 지원을 해야한다면 `target` 옵션에 브라우저명과 버전명을 적어준다.
- 이 경우 두가지 브라우저에서 동작이 가능한 상태로 바벨 프리셋이 변환시켜준다.
<pre>
module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                chrome: '79', 
                ie: '11'
            }
        }]
    ]
}
</pre>


####  🌈 폴리필(polyfill)
- `app.js` 수정
<pre>
// ES6 문법
new Promise();
</pre>
- 수정한 후 `npx babel app.js`를 하면 ES6 문법인데도 불구하고 변환이 되지 않았다.
- 이렇게 되면 IE에서 `promise` 문법을 해석하지 못하고 에러를 던진다.
<pre>
"use strict";

new Promise();
</pre> 

- **바벨은 ECMAScript5+를 ECMAScript5 버전으로 변환할 수 있는 것만 빌드한다.**
- 그렇기 때문에 그렇지 못한 것들은 **폴리필**이라고 부르는 부분조각을 추가해서 해결한다.
- `Promise`는 ECMAScript5버전으로 대체할 수 없다. 다만 구현할 수는 있다.([core.js-폴리필](https://www.npmjs.com/package/core-js))
- `env`프리셋은 폴리필을 지정할 수 있는 옵션을 제공한다.
<pre>
// babel.config.js
module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: {
                chrome: '79', 
                ie: '11'
            },
            useBuiltIns: 'usage', // 'entry' false
            corejs: {
                version: 2 //최신버전 3
            }
        }]
    ]
}
</pre>

- 설정 후 `npx babel app.js` 빌드 후 결과를 보면 여전히 `new Promise()`를 사용하고 있지만 `require` 함수가 동작하였다.
- 이런 방식으로 `Promise`를 IE에서 사용할 수 있다.
<pre>
"use strict";

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

new Promise();
</pre>

### 🔸 웹팩으로 통합
- 실무 환경에서는 바벨을 직접 사용하는 것보다는 웹팩을 통합해서 사용하는 것이 일반적이다.
- 로더 형태로 제공하는데 [`babel-loader`](https://github.com/babel/babel-loader) 가 그것이다.
- `babel-loader` 패키지를 설치한다.
<pre>
$ npm i babel-loader
</pre>
- `webpack.config.js`에 `babel-loader`를 추가시켜준다.
- `node-modules`에도 .js 파일이 존재하기 때문에 `exclude`옵션을 사용하여 제외시켜준다.
<pre>
module:{
    rules:[
      ...
      {
        test: /\.js$/, // .js로 끝나는 파일
        loader: 'babel-loader',
        exclude: /node-modules/, // node-modules에 있는 .js 파일들은 제외시킨다.
      }
    ]
}
</pre>
- 엔트리를 변경해준다.
<pre>
  entry: {
    main: "./app.js",
  }
</pre>
- 이 상태에서 `npm run build`를 하면 위에서 `Promise`프리셋 작업에서 `app.js`에 `require`함수가 같이 호출됬었다.
- 이 때문에 생성된 `require` 함수가 `node-modules`에서 `core-js`를 찾을려고 하는데 `node-modules`에는 존재하지 않기 때문에 에러가 발생한다.
- `core-js` 패키지 설치
<pre>
$ npm i core-js@2 // @는 특정 버전을 설치할 수 있다.
</pre>
- 그 후 다시 `npm run build` 실행시 정상적으로 빌드된 것을 확인할 수 있다.