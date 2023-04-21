import { MySqlUtil } from "kalmia-sql-lib";
import { getConnection, timeout } from "./util";

(async () => {
  const start = new Date();
  await example1();
  const end = new Date();
  console.log("Duration: ", (end.getTime() - start.getTime()) / 1000, "s");
})().catch(async (err) => {
  console.log(err);
});

export async function example1() {
  const conn = await getConnection();
  const mysql = new MySqlUtil(conn);

  const connection = await mysql.start();
  try {
    const res = (
      await mysql.paramExecute(
        "SELECT * FROM user where id = 1", //  FOR UPDATE;
        null,
        connection
      )
    )[0];

    if (res.balance <= 100) {
      throw new Error("Unsufficient balance");
    }

    await mysql.paramExecute(
      `
      INSERT INTO items (name, userId) VALUES ('game credit 10',${res.id});
    `,
      null,
      connection
    );

    await mysql.paramExecute(
      `
      UPDATE user SET balance = balance - 100 where id = ${res.id};
    `,
      null,
      connection
    );

    await timeout(7000);

    // throw new Error("Test");

    await connection.commit();
  } catch (e) {
    console.log(e);
    await connection.rollback();
  }
}
