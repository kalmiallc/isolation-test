import * as dotenv from "dotenv";

/**
 * Environment object interface.
 */
export interface IEnv {
  MYSQL_HOST: string;
  MYSQL_PORT: number;
  MYSQL_DB: string;
  MYSQL_USER: string;
  MYSQL_PASSWORD: string;
  MYSQL_POOL: number;
  MIGRATION_LOGGING: boolean;
}

/**
 * Load variables from .env.
 */
dotenv.config();

export let env: IEnv = {
  /**
   * MySql information.
   */
  MYSQL_HOST: process.env["MYSQL_HOST"] || "localhost",
  MYSQL_PORT: parseInt(process.env["MYSQL_PORT"], 10) || 3306,
  MYSQL_DB: process.env["MYSQL_DB"],
  MYSQL_USER: process.env["MYSQL_USER"],
  MYSQL_PASSWORD: process.env["MYSQL_PASSWORD"],
  MYSQL_POOL: parseInt(process.env["MYSQL_POOL"], 10) || 100,
  MIGRATION_LOGGING:
    process.env["MIGRATION_LOGGING"]?.toLowerCase() === "true" || false,
};
