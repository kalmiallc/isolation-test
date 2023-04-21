import { DbConnectionType, MySqlConnManager } from "kalmia-sql-lib";
import { env } from "./config/env";

export const timeout = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export async function getConnection() {
  const conn = await MySqlConnManager.getInstance().getConnection(
    DbConnectionType.PRIMARY,
    {
      database: env.MYSQL_DB,
      host: env.MYSQL_HOST,
      port: env.MYSQL_PORT,
      user: env.MYSQL_USER,
      password: env.MYSQL_PASSWORD,
      pool: env.MYSQL_PORT,
    }
  );
  return conn;
}
