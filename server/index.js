const express = require("express");

const app = express();

const models = require("./models");

// 将请求路由指定到自定义的路径
// app.get("/", (req, res) => {
//   res.send("hello world-1");
// });

models(app);
const port = 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
