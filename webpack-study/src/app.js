// import * as math from "./math.js";
// import { sum } from "./math.js";

// console.log(math.sum(1, 2));

// --loader
import axios from "axios";
import "./app.css";
import "./app.scss";
import woowa from "./woowa.PNG";
import form from "./form";
import result from "./result";

let resultEl;
let formEl;

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get("/api/users");
  console.log(res);

  document.getElementById("woo").innerHTML = `
        <img src="${woowa}" />
    `;
  // document.getElementById("list").innerHTML = (res.data || [])
  //   .map((user) => {
  //     return `<div>${user.id}: ${user.name}</div>`;
  //   })
  //   .join("");

  formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});

// hmr을 켜면 module.hot에 값이 들어온다.
if (module.hot) {
  console.log("핫 모듈 켜짐");

  module.hot.accept("./result", async () => {
    console.log("result 모듈 변경됨.");
    resultEl.innerHTML = await result.render();
  });

  module.hot.accept("./form", async () => {
    console.log("form 모듈 변경됨.");
    formEl.innerHTML = form.render();
  });
}

console.log(process.env.NODE_ENV);
console.log(TWO); // 2
console.log(api.domain);
