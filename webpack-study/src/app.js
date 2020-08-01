// import * as math from "./math.js";
// import { sum } from "./math.js";

// console.log(math.sum(1, 2));

// --loader
import "./app.css";
import "./app.scss";
import woowa from "./woowa.PNG";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("woo").innerHTML = `
        <img src="${woowa}" />
    `;
});

console.log(process.env.NODE_ENV);
console.log(TWO); // 2
console.log(api.domain);
