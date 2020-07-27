module.exports = function myBabelPlugin(){
    return{
        // 커스텀 플러그인을 만들때 visitor라는 객체를 반환해주어야 한다.
        visitor: {
            // Identifier는 path라는 객체를 받는다.
            Identifier(path){
                // 파싱된 결과물에 접근할 수 있다.
                const name = path.node.name;

                // 바벨이 만든 AST 노드를 출력한다.
                console.log('Identifier() name : ', name)

                // 변환작업 : 코드 문자열을 역순으로 변환한다.
                // path.node.name = name.split('').reverse().join('');
            }
        },
    };
}