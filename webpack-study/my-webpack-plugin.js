// javascript 에서 클래스를 생성할 떄 대문자.
class MyWebpackPlugin {
  apply(compiler) {
    // apply 생성 후 compiler라는 객체를 주입해준다.
    // compiler.hooks.done.tap('My Webpack Plugin',stats =>{
    //     console.log('My Webpack Plugin : done'); // 플러그인이 완료 됬을 때 실행되는 콜백 함수
    // })

    // 첫번째 인자로 emit이라는 문자열 전달하고 두번째 인자가 실행될때 번들된 결과물에 접근할 수 있다.
    compiler.plugin("emit", (compilation, callback) => {
      // 웹팩이 번들링한 결과물에 접근할 수 있다.
      const source = compilation.assets["main.js"].source();
      //console.log(source);
      // 번들된 결과물에 내용을 추가한다. (재정의)
      compilation.assets["main.js"].source = () => {
        const banner = [
          "/**",
          "* 이것은 bannerplugin이 처리한 결과입니다.",
          "* Build date : 2020-07-25",
          "*/",
        ].join("\n");
        // 앞에다가 banner를 추가하고 줄바꿈을 하고 원본 source를 합한 문자열을 반환한다.
        // 원본 코드 맨 상단에 banner(주석)이 추가가 된다.
        return banner + "\n\n" + source;
      };

      callback();
    });
  }
}

module.exports = MyWebpackPlugin;
