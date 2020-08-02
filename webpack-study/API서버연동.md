# ✔ API 서버 연동
- API 없이 개발을 하면 프론트앤드 개발을 하는데 난감할 때가 있다
- 목업(가짜) 데이터를 제공해주는 목업 API를 만들어서 개발을 하면 좀 더 수월하다.
- 웹팩 개발 서버는 이러한 목업 API를 제공하는 기능이 있다.

## 🌈 목업 API1
<pre>
// webpack.config.js
  devServer: {
    overlay: true,
    stats: "errors-only",
    // 웹팩 개발 서버 객체를 받는다.
    before: (app) => {
      // 익스프레스 js의 프레임워크
      app.get("/api/users", (req, res) => {
        res.json([
          {
            id: 1,
            name: "Alice",
          },
          {
            id: 2,
            name: "Bek",
          },
          {
            id: 3,
            name: "Chris",
          },
        ]);
      });
    },
  },
</pre>
- 이렇게 한뒤 웹팩 개발 서버 쪽으로 API요청을 날려본다. (http://localhost:8080/api/users/)
- json 데이터가 응답을 하는 것을 알 수 있다.
- 받은 API을 프론트앤드 애플리케이션에서 받아서 사용해본다.
- Ajax요청을 호출하는 라이브러리 중에 `axios` 라이브러리를 사용해본다.
<pre>
$ npm i axios
</pre>
- `app.js`를 `axios`라이브러리를 사용할 수 있게 수정해주고 api를 받는다.
<pre>
import axios from "axios";
...

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get("/api/users");
  console.log(res);
  document.getElementById("list").innerHTML = (res.data || [])
    .map((user) => {
      return `< div>${user.id}: ${user.name}< /div>`;
    })
    .join("");
});
</pre>

## 🌈 목업 API2
- 목업 API가 많이 필요할 때는 전용 패키지를 사용하는 것이 방법일 수도 있다.
- 이 패키지를 웹팩 개발 서버에 연동시킨다.
- `connect-api-mocker` 패키지를 사용하여 특정 목업 폴더를 만들어 api 응답을 담은 파일을 저장한 뒤, 이 폴더를 api로 제공해 주는 기능을 한다.
<pre>
$ npm i connect-api-mocker
</pre>
- 폴더를 `mocks/api/users`로 만들고 그 안에 `GET.json`파일을 만들어 작성해준다.
<pre>
[
    {
      "id": 1,
      "name": "Alice"
    },
    {
      "id": 2,
      "name": "Bek"
    },
    {
      "id": 3,
      "name": "Chris"
    }
]
</pre>
- `webpack.config.js`파일에 `connect-api-mocker`패키지를 가져와서 `mocks/api/users`폴더의 json을 불러온다.
<pre>
const apiMocker = require('connect-api-mocker');
... 
devServer: {
    ...
    before: (app) => {
      // 미들웨어를 추가하는 형식
      // 첫번째인자(rootURL)은 /api것들은 mocker가 처리
      // 두번째인자는 (pathURL) mocks/api
      app.use(apiMocker("/api", "mocks/api"));
    },
}
</pre>
- 동일한 결과가 나오게 된다.

## 🌈 실제 API 연동
- `CORS`: https://developer.mozilla.org/ko/docs/Web/HTTP/CORS
- api 서버를 로컬환경에서 띄운 다음 목업이 아닌 이 서버에 직접 api 요청을 해보면(localhost:8081) cors 오류가 출력된다.
- localhost:8080에서 localhost:8081 로 ajax 호출을 하지 못하는데 이유는 CORS 정책 때문이라는 메세지다. 요청하는 리소스에 “Access-Control-Allow-Origin” 헤더가 없다는 말도 한다.
- 브라우져와 서버간의 보안상의 정책인데 브라우저가 최초로 접속한 서버에서만 ajax 요청을 할 수 있다는 내용이다.
- 해결하는 방법은 두 가지이다. 
- 해당 api 응답 헤더에 “Access-Control-Allow-Origiin: *” 헤더를 추가한 뒤 응답하면, 브라우져에서 응답 데이터를 받을 수 있다.
<pre>
app.get('/api/users', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // 헤더를 추가한다 
  res.json(users)
})
</pre>
- 서버 응답 헤더를 추가할 필요없이 웹팩 개발 서버에서 api 서버로 프록싱하는 것이다. 웹팩 개발 서버는 proxy 속성으로 이를 지원한다.
<pre>
// webpack.config.js
module.exports = {
  devServer: {
    proxy: {
      '/api': 'http://localhost:8081', // 프록시
    }
  }
}
</pre>