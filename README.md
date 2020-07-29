# ✔ 프런트엔드 개발환경의 이해
> - [인프런 강의 내용 정리](https://www.inflearn.com/course/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%ED%99%98%EA%B2%BD)
### ✌ [npm](https://github.com/saseungmin/Webpack-Babel-Lint-tutorial/tree/master/npm)
### ✌ [webpack](https://github.com/saseungmin/Webpack-Babel-Lint-tutorial/tree/master/webpack-study)
#### 🌈 entry/output
#### 🌈 loader
- css-loader
- style-loader
- sass-loader
- file-loader
- url-loader
#### 🌈 plugin
- BannerPlugin
- DefinePlugin
- HtmlTemplatePlugin
- CleanWebpackPlugin
- MiniCssExtractPlugin
#### 🌈 babel
- @babel/core 
- @babel/cli
- 바벨 플러그인
    - @babel/plugin-transform-block-scoping
    - @babel/plugin-transform-arrow-functions
    - @babel/plugin-transform-strict-mode
- 프리셋
    - @babel/preset-env
- env 프리셋 설정과 폴리필
    - 타겟 브라우저
    - 폴리필(core.js)
- 웹팩으로 통합
    - babel-loader