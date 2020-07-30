## ✌ 린트(Lint)
> https://jeonghwan-kim.github.io/series/2019/12/30/frontend-dev-env-lint.html

### 🔸 린트가 필요한 상황
- `console.log()` 함수를 실행하고 다음 줄에서 즉시 실행함수를 실행시키는 코드즐 작성
<pre>
console.log()
(function() {})()
// TypeError: console.log(...) is not a function
</pre>
- 이 경우 TypeError 에러가 발생한다.
- 브라우저는 코드에 세미콜론을 자동으로 넣는 과정(ASI)을 수행하기 떄문에 의도대로 해석하지 못하고 아래 코드로 해석하게 된다.
<pre>
console.log()(function(){})();
</pre>
- 린트는 코드의 가독성을 높이는 것 뿐만 아니라 동적 언어의 특성인 런타임 버그를 예방하는 역할도 한다.

### 🔸ESLint
- ESLint는 ECMAScript 코드에서 문제점을 검사하고 일부는 더 나은 코드로 정정하는 린트 도구 중의 하나다.
- 코드에서 검사하는 항목을 크게 분류하면
    - 포맷팅 (글 길이 같은 거)
    - 코드 품질(코드가 잠재적으로 오류를 가지고 있는 것을 체크를 해준다.)
<pre>
$ npm i eslint
</pre>
- `.eslintrc.js` 파일 생성 한다.

#### 🌈 규칙(Rules)
- ESLint는 검사 규칙을 미리 정해 놓았다.
- [ESLint Rules 문법](https://eslint.org/docs/rules/)에서 확인가능
- `.eslintrc.js`에 `no-unexpected-multiline`(기대하지 않은 줄바꿈) 함수와 괄호사이에 줄바꿈이 있으면 오류가 나도록 설정한다.
<pre>
module.exports ={
    rules: {
        "no-unexpected-multiline": "error"
    }
}
</pre>

- `npx eslint app.js` 하면 에러가 발생한다.

![mm](./img/13.PNG)

- 세미콜론을 붙치고 `npx eslint app.js`하면 잘 실행한다.

- 불필요한 세미콜론이 있을 시 에러가 발생하도록할 땐 `no-extra-semi`를 사용한다.
<pre>
module.exports ={
    rules: {
        "no-unexpected-multiline": "error",
        "no-extra-semi": "error"
    }
}
</pre>

![ee](./img/14.PNG)

- 콘솔의 에러 메시지를 보면 `1 error and 0 warnings potentially fixable with the '--fix' option.`이라는 메시지를 확인 할 수 있다.
- 뒤에 `--fix`옵션을 주고 실행하면 자동으로 세미콜론이 지워지고 정상적으로 실행이되게 된다.
- 또한, 파일의 불필요한 세미콜론도 자동으로 삭제가 되었다.
<pre>
$ npx eslint app.js --fix
</pre>

- 앞에 렌치 표시가 붙어있으면 `--fix` 명령어를 사용해 자동으로 수정할 수 있다.
![ㅂㅂ](./img/15.PNG)

- 이러한 필요한 규칙들을 다 일일히 세팅하는 방법보다는 규칙들을 하나의 세트로 만들어 놓은 것을 **Extensible Config**라고 한다.
- 규칙 목록 중에 왼쪽에 체크 표시되어 있는 것이 이설정에서 활성화되어 있는 규칙이다.
<pre>
module.exports ={
    extends:[
        "eslint:recommended"
    ]
}
</pre>
- 만약 이 설정 외에 규칙이 더 필요하마면 `rules` 속성에 추가해서 확장할 수 있다.
- ESLint에서 기본적으로 제공하는 설정 외에 자주 사용하는 두 가지가 있다.
    - airbnb :  [airbnb](https://github.com/airbnb/javascript) 스타일 가이드를 따르는 규칙 모음이다. [eslint-config-airbnb-base](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base) 패키지로 제공된다.
    - standard : [자바스크립트 스탠다드 스타일](https://standardjs.com/)을 사용한다. [eslint-config-standard](https://github.com/standard/eslint-config-standard) 패키지로 제공된다.


#### 🌈 초기화
- 위와 같은 설정은 `--init` 옵션을 추가하면 쉽게 구성할 수 있다.
<pre>
$ npx eslint --init
</pre>

![wwe](./img/16.PNG)

1. To check syntax only: syntax만 체크
2. To check syntax and find problems: 코드 포맷팅이랑 코드 품질까지 체크할꺼다.
3. To check syntax, find problems, and enforce code style: 코드 포맷팅이랑 코드 품질, 코딩 스타일(airbnb, standard)까지 체크할꺼다. 

![ㅈㅈ](./img/17.PNG)
- 지금 사용하고 있는 모듈은 어떤것을 쓸지를 선택한다.

![ㅈㅈ](./img/18.PNG)
- 사용하고 있는 프레임워크를 선택한다.

![ㅈㅈ](./img/19.PNG)
- 타입스크립트를 사용하는지의 여부를 선택한다.

![ㅈㅈ](./img/20.PNG)
- 이 코드가 노드에서 돌아가는지 브라우저에서 돌아가는지에 대해서 선택한다.

![ㅈㅈ](./img/21.PNG)
- 설정 파일을 어떤것으로 할지를 선택한다

![ㅈㅈ](./img/22.PNG)
- eslint 가장 최신버전으로 선택할지의 여부를 선택한다.

- 설치 후 `.eslintrc.js`를 확인하면 변경이 되어 있다.
<pre>
module.exports = {
    "env": { // 환경
        "browser": true,
        "es2020": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
    }
};
</pre>

- `package.json` 의 `script` 부분을 수정해주어 간단하게 명령어로 동작시킬 수 있다.
<pre>
  "scripts": {
    ...
    "lint": "eslint src --fix"
  },
</pre>


### 🔸Prettier
- 프리티어는 좀 더 일관적인 스타일로 코드를 다듬는다.
- 반면 코드 품질과 관련된 기능은 하지 않는 것이 ESLint와 다른 점이다.
- `prettier` 패키지 설치
<pre>
$ npm i prettier
</pre>
- `npx prettier app.js`를 실행해 보면 세미콜론이 붙은 채 실행되 되었다.
<pre>
$ npx prettier app.js
console.log()
// 결과
console.log();
</pre>
- 파일 자체를 변경하고 싶으면 `--write` 옵션을 붙여준다.
<pre>
$ npx prettier app.js --write
</pre>
- 프리티어의 강점은 ESLint가 고칠 수 없는 그래서 개발자에게 고치라고 던져주는 코드도 프리티어가 자동으로 고쳐준다.
- 좀 더 읽기 쉬운 형태로 변형해준다.
- ESLint와 prettier를 같이 사용하고 싶다면 하나로 통합해서 사용할 수 있는 방법이 존재한다.

#### 🌈 통합 방법
- 포맷팅은 프리티어에게 맡기더라도 코드 품질과 관련된 검사는 ESLint가 해주어야 한다.
- 프리티어는 이러한 ESLint와 통합 방법을 제공한다.
- [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)는 프리티어와 충돌하는 ESLint 규칙을 끄는 역할을 한다.
- `eslint-config-prettier` 패키지 설치
<pre>
$ npm i eslint-config-prettier
</pre>
- `.eslintrc.js`의 `extends`에 추가해준다.
- `eslint:recommended`에 해당하는 규칙들 중에 `prettier`와 겹치는게 존재하면 꺼버리는 설정이다.
<pre>
module.exports = {
    ...
    "extends": ["eslint:recommended",'eslint-config-prettier'],
    ...
};
</pre>
- 이 방법도 매번 `eslint`와 `prettier`를 번갈아 가며 사용하는 것은 불편한 방법이다.
- [`eslint-plugin-prettier`](https://github.com/prettier/eslint-plugin-prettier) 방법은 프리티어의 모든 규칙을 ESLint의 규칙으로 추가하는 플러그인이다.
- 때문에 프리티어의 모든 규칙이 ESLint로 들어오기 때문에 ESLint만 실행하면 된다.
- `eslint-plugin-prettier` 패키지 설치
<pre>
$ npm i eslint-plugin-prettier
</pre>
- `rules`에는 프리티어 규칙을 위반하면 에러를 반환하도록 설정해준다.
- `plugins`에는 `["prettier"]`을 추가시켜준다.
<pre>
module.exports = {
  ...
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error",
  },
};
</pre>
- 다른 방법으론 `extends`에 `plugin`을 추가시킨다.
<pre>
extends: ["eslint:recommended", "plugin:prettier/recommended"]
</pre>
- `app.js`를 변경
<pre>
// eslint 가 변환
var foo = '';
// prettier가 변환
console.log();;;;
</pre>
- `npx eslint app.js --fix` 실행
- 사용하지 않는 변수에 대해서 에러를 리포팅한다.

![ing](./img/23.PNG)
<pre>
// 결과
var foo = "";

console.log();
</pre>