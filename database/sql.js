const mysql = require("mysql2");
// sql설치했던 것을 불러온다.

const pool = mysql.createPool(
  process.env.JAWSDB_URL ?? {
    host: "localhost",
    user: "root",
    database: "mydatabase",
    password: "123456789",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  }
);
// 접속정보를 넣어준다.
// JAWSDB_URL 값이 없으면, {}안의 내용을 사용한다는 뜻

const promisePool = pool.promise();

const sql = {
  getSections: async () => {
    const [rows] = await promisePool.query(`
      SELECT * FROM sections
    `);
    return rows;
  },
  // SELECT * FROM sections 구문을 이용하여 이 쿼리로 모든 것을 선택한 다음에
  //  그 결과들을 rows라는 곳으로 가져온다.

  // 이제 섹션과 함께 Join된다
  getBusinessesJoined: async (query) => {
    const sqlQuery = `
      SELECT * FROM sections S
      LEFT JOIN businesses B
        ON S.section_id = B.fk_section_id
      WHERE TRUE
        ${query.section ? "AND section_id = " + query.section : ""}
        ${query.floor ? "AND floor = " + query.floor : ""}
        ${query.status ? "AND status = '" + query.status + "'" : ""}
      ORDER BY
         ${query.order ? query.order : "business_id"}
    `;
    console.log(sqlQuery);

    const [rows] = await promisePool.query(sqlQuery);
    return rows;
  },
};

module.exports = sql;
