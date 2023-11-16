const mysql = require("mysql2");

const options = {
  host: "127.0.0.1", // 主机名
  port: "3306",
  user: "root", // 数据库用户名
  password: "12345678", //密码
  database: "taocheche", // 数据库名称
};
// 创建数据库连接
const connection = mysql.createConnection(options);
// 建立连接
connection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("数据库连接成功");
});

// // 执行sql查询命令
// connection.query("SELECT * from teacher_table", (err, res, fields) => {
//   console.log(err, "12", res, "1", fields);
// });

// 公共的查询方法
const sqlQuery = (strSql) => {
  return new Promise((resolve, reject) => {
    connection.query(strSql, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res);
    });
  });
};

module.exports = sqlQuery;
