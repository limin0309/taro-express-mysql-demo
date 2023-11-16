const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");

const imgList = [
  "https://static.runoob.com/images/demo/demo2.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw5oaXiGqxZ8B_EZ-oI-vWFLeBrHQfxIKMPt71YYeQ&s",
];

// auto_increment：每插入一条数据，自动增量
// engine:引擎类型
const createtable = async () => {
  try {
    // 创建表
    const createTableSql = `
    create table if not exists ads (
      id int auto_increment,
      imgUrl char(255) not null,
      primary key (id)
    ) engine=innodb;
    `;
    await sqlQuery(createTableSql);
    for (let i = 0; i < imgList.length; i++) {
      const insertSql = `insert into ads (id, imgUrl) values (null,
        '${imgList[i]}')`;
      await sqlQuery(insertSql);
    }
  } catch (err) {
    console.log(err, "31");
  }
};

createtable();
router.get("/advertising", async (req, res) => {
  const strSql = `select * from ads`;
  try {
    const result = await sqlQuery(strSql);
    res.send({
      code: 1,
      message: "请求成功",
      result,
    });
  } catch (err) {
    res.send({
      code: -1,
      message: "请求失败",
    });
  }
});
module.exports = router;
