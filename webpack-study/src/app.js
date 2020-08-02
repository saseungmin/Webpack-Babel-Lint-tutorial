// import * as math from "./math.js";
// import { sum } from "./math.js";

// console.log(math.sum(1, 2));

// --loader
import axios from "axios";
import "./app.css";
import "./app.scss";
import woowa from "./woowa.PNG";

document.addEventListener("DOMContentLoaded", async () => {
  const res = await axios.get("/api/users");
  console.log(res);

  document.getElementById("woo").innerHTML = `
        <img src="${woowa}" />
    `;
  document.getElementById("list").innerHTML = (res.data || [])
    .map((user) => {
      return `<div>${user.id}: ${user.name}</div>`;
    })
    .join("");
});

console.log(process.env.NODE_ENV);
console.log(TWO); // 2
console.log(api.domain);
