module.exports = {
    presets: [
        //'./my-babel-preset.js'
        ['@babel/preset-env', {
            targets: {
                chrome: '79', 
                ie: '11'
            },
            useBuiltIns: 'usage', // 'entry' false 폴리필 사용 방식 지정
            corejs: { // 폴리필 버전 지정
                version: 2 //최신버전 3
            }
        }]
    ]
}