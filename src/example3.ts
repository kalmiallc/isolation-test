import { MySqlUtil } from "kalmia-sql-lib";
import { IsolationLevel } from "kalmia-sql-lib/dist/config/types";
import { getConnection } from "./util";

(async () => {
  const start = new Date();
  await example3();
  const end = new Date();
  console.log("Duration: ", (end.getTime() - start.getTime()) / 1000, "s");
})().catch(async (err) => {
  console.log(err);
});

export async function example3() {
  const conn = await getConnection();
  const mysql = new MySqlUtil(conn);

  try {
    const res = (
      await mysql.paramExecute(
        "SELECT * FROM user where id = 1;",
        null,
        undefined,
        IsolationLevel.READ_UNCOMMITTED
      )
    )[0];

    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
