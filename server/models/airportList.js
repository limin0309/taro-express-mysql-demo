const express = require("express");
const router = express.Router();
const sqlQuery = require("../mysql");
const request = require("request");
const mock = require("./mock.json");

// demo
// 创建机场城市列表mysql
// request(
// "http://101.132.140.113/city/airportList",
// { json: true },
// async (err, res, body) => {
// const createtable = async () => {
//   try {
//     const mockBody = mock;
//     const strSql1 = `
//     create table airport_list(
//       id int not null auto_increment,
//       cityName char(50) not null,
//       cityId int not null,
//       firstLetter char(50) not null,
//       airportName char(50) not null,
//       primary key (id)
//     ) engine=innodb;
//   `;
//     // 删除表
//     await sqlQuery(`drop table if exists airport_list`);
//     await sqlQuery(strSql1);
//     for (let i = 0; i < mockBody.result.length; i++) {
//       const { id, cityId, cityName, firstLetter, airportName } =
//         mockBody.result[i];
//       const strSql2 = `insert into airport_list(id, cityName, cityId, firstLetter, airportName) values (${id}, '${cityName}', ${cityId}, '${firstLetter}', '${airportName}');`;
//       await sqlQuery(strSql2);
//     }
//   } catch (err) {
//     console.log(err, "31");
//   }
// };
// );

// createtable();
router.get("/airportList", async (req, res) => {
  const strSql = `select * from airport_list`;
  try {
    const result = await sqlQuery(strSql);
    // 按照首字母排序
    if (Array.isArray(result) && result.length) {
      // sort方法是按照字符串到ASCII进行排序
      result.sort((x, y) => {
        if (x.firstLetter < y.firstLetter) {
          return -1;
        } else if (x.firstLetter > y.firstLetter) {
          return 1;
        }
        return 0;
      });
    }
    res.send({
      code: 1,
      mes: "请求成功",
      result,
    });
  } catch (err) {
    res.send({
      code: -1,
      mes: "请求失败",
    });
  }
});

module.exports = router;
