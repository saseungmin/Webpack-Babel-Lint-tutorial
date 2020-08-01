module.exports = {
    presets: [
        //'./my-babel-preset.js'
        ['@babel/preset-env', {
            targets: {
                chrome: '79',
            },
            // useBuiltIns: 'usage' ie에서 인식하지 못하는것을 바꿔준다.
            useBuiltIns: 'usage', // 'entry' false 폴리필 사용 방식 지정
            // 폴리필 라이브러리
            corejs: { // 폴리필 버전 지정
                version: 2 //최신버전 3
            }
        }]
    ]
}
