import { MySqlUtil } from "kalmia-sql-lib";
import { IsolationLevel } from "kalmia-sql-lib/dist/config/types";
import { getConnection, timeout } from "./util";

(async () => {
  const start = new Date();
  await example2();
  const end = new Date();
  console.log("Duration: ", (end.getTime() - start.getTime()) / 1000, "s");
})().catch(async (err) => {
  console.log(err);
});

export async function example2() {
  const conn = await getConnection();
  const mysql = new MySqlUtil(conn);

  const connection = await mysql.start(); // IsolationLevel.READ_COMMITTED
  const res1 = await mysql.paramExecute(
    `SELECT sum(number) FROM numbers;`,
    null,
    connection
  );
  console.log(res1);

  const res = await mysql.paramExecute(
    `SELECT * FROM user where id = 1 FOR UPDATE;`,
    null,
    connection
  );
  console.log(res);

  const res2 = await mysql.paramExecute(
    `SELECT sum(number) FROM numbers;`,
    null,
    connection
  );
  console.log(res2);

  await timeout(7000);

  const query3 = `
    INSERT INTO numbers (number) VALUES (1);
  `;

  await mysql.paramExecute(query3, null, connection);

  await connection.commit();
}
