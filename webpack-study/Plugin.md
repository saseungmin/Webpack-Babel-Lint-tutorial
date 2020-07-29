## ✌ 플러그인
- 로더가 각 파일 단위로 처리했던 반먼 플러그인은 번들된 결과물 하나를 처리한다.
- 자바스크립트 코드를 난독화 한다거나 특정 텍스트 용도로 사용한다.
### 🔸 커스텀 플러그인 만들기
- [Writing a plugin](https://webpack.js.org/contribute/writing-a-plugin/)
- 로더는 함수로 정의했던거와는 다르게 플러그인은 클래스로 정의한다.
- `my-webpack-plugin.js` 생성
<pre>
class MyWebpackPlugin {
    apply(compiler){ // apply 생성 후 compiler라는 객체를 주입해준다.
        compiler.hooks.done.tap('My Webpack Plugin',stats =>{
            console.log('My Webpack Plugin : done'); // 플러그인이 완료 됬을 때 실행되는 콜백 함수
        })
    }
}

module.exports = MyWebpackPlugin;
</pre>
- `webpack.config.js`에 추가
    - 로더는 `module` 객체에다가 추가하는 방식이라면 플러그인은 `plugins` 배열에 추가한다.
<pre>
  plugins:[
    // 클래스 객체 생성
    new MyWebpackPlugin() 
  ]
</pre>
- 설정 후 `npm run build`를 하면 콘솔창에 `My webpack Plugin : done` 메시지를 확인할 수 있다.
- 로더가 소스에 있는 여러 개의 파일에 대해서 각각 실행했다면, 플러그인은 파일들을 하나로 뭉처놓은 번들파일에 대해서 딱 한번 실행된다.
#### ❓ 어떻게 플러그인이 번들된 파일에 접근할 수 있을까?
- 웹팩 내장 플러그인 [`BannerPlugin`](https://webpack.js.org/plugins/banner-plugin/) 참고
- `my-webpack-plugin.js` 주석 참고
- `npm run build` 하고 난 뒤 `./dist/main.js`를 확인하면 맨 상단에 주석이 적힌 것을 확인할 수 있다.

![plugin](./img/11.PNG)

- 이렇듯 웹팩의 로더는 모듈로 연결되어 있는 각 파일들을 처리하고 파일을 하나로 만들어주는데 만들어주기 직전에 플러그인이 중간에 개입해서 아웃풋으로 만들어질 번들링에 후처리를 해준다.

## ✌️ 자주사용하는 플러그인
### 🔸 [BannerPlugin](https://webpack.js.org/plugins/banner-plugin/)
- 결과물에 빌드 정보나 커밋 버젼 같은 것을 추가시킬 수 있다.
- 웹팩이 기본으로 제공하는 플러그인이다.
<pre>
const webpack = require('webpack');
...
  plugins:[
    new webpack.BannerPlugin({
      banner:'BannerPlugin의 banner 입니다.'
    })
  ]
</pre>
- `npm run build` 하면 `main.js`에 BannerPlugin에서 banner로 적은 문자열이 맨 상단에 주석으로 나타난다.
- `webpack.config.js` 수정
    - `child_process`를 사용하여 git의 커밋 버전과 이름, 이메일을 상단 주석으로 작성한다.
<pre>
// node 모듈중에 child process는 터미널 명령어를 실행할 수 있게 해준다.
const childProcess = require('child_process');

  plugins:[
    new webpack.BannerPlugin({
      banner: `
        Build Date: ${new Date().toLocaleString()} // build된 시간
        // git commit 버전의 해시값을 가져온다
        Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
        Author: ${childProcess.execSync('git config user.name')}
        Author-Email: ${childProcess.execSync('git config user.email')}
        `
    })
  ]
</pre>
- `main.js` 상단 주석

![bb](./img/12.PNG)

### 🔸 [DefinePlugin](https://webpack.js.org/plugins/define-plugin/)
- 프런드앤드 소스코드는 개발환경과 운영환경으로 나누어서 운영한다.
- 환경에 따라 API 서버 주소가 다를 수 있다.
- 배포할때마다 소스코드를 수정하면 휴먼 에러가 발생하기 쉽고 장애가 일어나기 쉽다.
- 이런 API 주소처럼 환경 의존적인 정보를 소스가 아닌 곳에서 관리하는 것이 좋다.
- 웹팩은 이러한 환경 정보를 제공하기 위해 `DefinePlugin`을 제공한다.
<pre>
  plugins:[
    ...
    new webpack.DefinePlugin({})
  ]
</pre>
- `DefinePlugin`이 기본적으로 애플리케아션에 주입해주는 환경 변수가 있는데 그것이 노드의 환경 변수이다.
- 빈 객체를 전달해도 기본적으로 `process.env.NODE_ENV`인데 웹팩 설정의 `mode`에 설정한 값이 여기에 들어간다.
- 애플리케이션에서 `process.env.NODE_ENV`를 하면 `development` 값이 나온다.
<pre>
mode: "development",
</pre>
- 만약에 애플리케이션에서 `process.env.NODE_ENV`값이 `production`이라고 나오고 싶으면 `webpack.config.js`의 `mode`값을 `production`으로 변경해주면 된다.
- 그 외에 환경변수를 직접 변경하고싶을 땐 아래와 같이 한다.
    - 애플리케이션에서는 TWO라는 전역변수로 접근할 수 있고, 1+1이라는 코드가 실행된다.
<pre>
new webpack.DefinePlugin({
  TWO : '1+1'
})
// 애플리케이션에서 불러올때
console.log(TWO) // 2
</pre>
- 객체 형식으로도 접근 가능하다.
<pre>
new webpack.DefinePlugin({
  TWO : '1+1',
  'api.domain' : JSON.stringify('http://dev.api.domain.com')
})
// 애플리케이션에서 불러올 때
console.log(api.domain)
</pre>

### 🔸 [HtmlTemplatePlugin](https://webpack.js.org/plugins/html-webpack-plugin/)
- 웹팩의 써드 파티 플러그인으로 따로 설치를 해주어야 한다.
- HTML 파일을 후처리하는데 사용한다.
- 빌드 타임의 값을 넣거나 코드를 압축할 수 있다.
- 웹팩의 빌드과정중 html 파일도 넣고싶을때 사용한다.
<pre>
$ npm i html-webpack-plugin
</pre>
- `index.html` 파일을 src로 옮겨서 소스파일로 관리하겠다는 것을 알려준다.
- `index.html`에 javascript 로딩하는 구문을 지운다.(`<script src="dist/main.js"></script>`)
- `webpack.config.js`파일에서 `HtmlwebpackPlugin`을 세팅한다.
- `plugins`에 추가
    - 옵션을 전달할 때 템플릿 경로를 전달할 수 있다.
<pre>
new HtmlWebpackPlugin({
  template: './src/index.html'
})
</pre>
- 설정한 뒤 `npm run build` 실행하면 `dist`폴더에 `index.html`파일이 들어온것을 확인할 수 있다.
- `index.html`을 보면 작성하지 않았던 script 구문이 작성되어있는 것을 확인할 수 있다. (아웃풋(main.js))
- `HtmlTemplatePlugin`을 사용하면 좀더 의존적이지 않게 파일을 만들 수 있다.
- 애플리케이션을 실행할 땐 `dist/index.html`로 접근하여 실행하면 된다.
- `index.html`파일이 `dist`폴더로 옮겨졌기 때문에 `webpack.config.js`에서 `url-loader`의 `options`의 `publicPath`에 설정된 prefix를 없애준다.
#### htmltemplateplugin을 사용하면 좀 더 유동적으로 템플릿을 만들어 낼 수 있다.
- 예를 들어 개발용일 때와 배포용일 때에 따라 애플리케이션에서 나타나는 화면을 달리 할 수 있다.
- html 파일에 `EJS`문법을 사용하여 할 수 있다.
- 웹팩쪽에서 env에 해당하는 값을 넣어준다.
<pre>
// src/index.html
// env라는 변수를 넣을 수 있는 탬플릿 문법이다.
< title>Document<%= env %> < /title>
</pre>
- 'templateParameters'에 템플릿에서 사용할 변수 값(env)를 넣고 조건을 넣는다.
- `process.env.NODE_ENV`가 개발용일때는 title에 개발용을 붙여주고, production 일때는 빈 문자열을 반환해준다.
<pre>
new HtmlWebpackPlugin({
  template: './src/index.html',
  templateParameters: {
    env: process.env.NODE_ENV === 'development' ? '(개발용)' : ''
  }
})
</pre>
- 설정 후 `NODE_ENV=development npm run build`를 해주면 `dist/index.html`의 title에 `(개발용)`이라는 것이 붙여진걸 확인할 수 있다.
- 브라우저에서도 확인이 가능하다.
- 이런식으로 개발환경과 배포환경의 확연히게 구분할 수 있어 휴먼에러를 줄일 수 있다.
- 또한, `minify`옵션에 `collapseWhitespace`는 빈칸을 제거하는 옵션이고, `removeComments`는 주석을 제거하는 옵션으로 한줄로 주석없이 빌드된 `dist/index.html`을 볼 수 있다.
<pre>
// 배포환경에서만
minify: process.env.NODE_ENV === 'production' ? {
  collapseWhitespace: true,
  removeComments: true,
} : false
</pre>

### 🔸 [CleanWebpackPlugin](https://github.com/johnagan/clean-webpack-plugin)
- 기본 플러그인이 아니기때문에 따로 설치를 해야한다.
- 빌드 이전 결과물을 제거해주는 플러그인이다.
- 빌드 결과물은 아웃풋 경로에 모이는데 과거 파일이 남아 있을 수 있다.
- `CleanWebpackPlugin`을 사용하면 빌드 결과를 싹 날리고 새로 저장된다.
<pre>
$ npm i clean-webpack-plugin
</pre>
- `webpack.config.js`의 `plugin`에 `CleanWebpackPlugin`을 추가시켜준다.
<pre>
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
...
plugins:[
  ...
  new CleanWebpackPlugin()
]
</pre>
- 설정한 뒤 `dist/`폴더에 중복되지 않은 파일을 하나 생성한 뒤 `npm run build`를 하면 삭제되는 것을 확인할 수 있다.

### 🔸 [MiniCssExtractPlugin](https://webpack.js.org/plugins/mini-css-extract-plugin/)
- 스타일시트가 점점 많아지면 하나의 자바스크립ㅂ트 결과물로 만드는 것이 부담일 수 있다.
    - 브라우저에서 큰 파일하나를 로딩하는 것이 성능에 영향을 줄 수 있다.
- 때문에 번들 결과에서 스타일시트 코드만 따로 뽑아서 별도의 CSS파일로 만들어 역할에 따라 파일을 분리하는 것이 좋다.
    - 브라우저에서 큰 파일 하나를 내려받는 것 보다, 여러 개의 작은 파일을 동시에 다운로드하는 것이 더 빠르다.
- `MiniCssExtractPlugin`은 javascript파일에서 CSS파일을 별도 뽑아내는 플러그인이다.
- 웹팩에서 지원하지 않는 써드파티 패키지이므로 설치가 필요하다.
<pre>
$ npm i mini-css-extract-plugin
</pre>
- `webpack.config.js`파일의 `plugin`에 `MiniCssExtractPlugin` 추가
<pre>
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
...
plugins:[
  // ... 배포환경일때만
    ...(process.env.NODE_ENV === 'production' 
      ? [new MiniCssExtractPlugin({filename: '[name].css',})] 
      : []
    )
]
</pre>
- 또한 다른 플러그인들과 다르게 `MiniCssExtractPlugin`는 로더 설정을 해주어야 한다.
- `MiniCssExtractPlugin` 사용할려면 `'style-loader'`,`'css-loader'` 대신에 자체적으로 제공하는 로더를 쓰는 것이 좋다.
    - 때문에 노드 환경 변수에 따라 다르게 세팅하는 것이 좋다.
<pre>
// loader 부분
{
  test: /\.css$/,
  use:[
    // 배포환경일때만 MiniCssExtractPlugin.loader 사용하고 개발환경에선 style-loader를 사용한다.
    process.env.NODE_ENV === 'production' 
    ? MiniCssExtractPlugin.loader
    : 'style-loader',
    'css-loader'
  ]
},
</pre>
- 설정 후 `NODE_ENV=production npm run build` 
- 윈도우에서는 안되기 때문에 `cross-env` 설치 해주어야 한다.
<pre>
$ npm i -g cross-env && npm i cross-env
$ cross-env NODE_ENV=production npm run build
</pre>
- 이렇게 실행 후 `dist` 폴더에 보면 `main.css` 파일이 생성되고 `index.html`에는 main.css가 link되어있는 것을 확인할 수 있다.