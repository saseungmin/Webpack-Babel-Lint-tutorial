module.exports = {
<<<<<<< HEAD
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
=======
  presets: [
    //'./my-babel-preset.js'
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "79",
          ie: "11",
        },
        // useBuiltIns: 'usage' ie에서 인식하지 못하는것을 바꿔준다.
        useBuiltIns: "usage", // 'entry' false 폴리필 사용 방식 지정
        // 폴리필 라이브러리
        corejs: {
          // 폴리필 버전 지정
          version: 2, //최신버전 3
        },
      },
    ],
  ],
};
>>>>>>> b90876f01e1fb1dcc83e90ca7770bfcff91caac2
