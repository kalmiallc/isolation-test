/* eslint-disable sonarjs/no-duplicate-string */
import { Migrations } from "kalmia-sql-lib";
import * as path from "path";
import { env } from "../config/env";

/**
 * Runs 'steps' new upgrade migrations.
 *
 * @param steps How many migration steps to run. Defaults to all.
 */
export const upgradeDatabase = async (
  steps: number = undefined
): Promise<void> => {
  const migration = new Migrations();
  await migration.init({
    tableName: "migrations",
    silent: !env.MIGRATION_LOGGING,
    path: path.join(__dirname, "..", "migrations"),
  });
  await migration.upgrade(steps);
};

/**
 * Runs 'steps' new seed migrations.
 *
 * @param steps How many migration steps to run. Defaults to all.
 */
export const seedDatabase = async (
  steps: number = undefined
): Promise<void> => {
  const migration = new Migrations();
  await migration.init({
    tableName: "seeds",
    silent: !env.MIGRATION_LOGGING,
    path: path.join(__dirname, "..", "seeds"),
  });
  await migration.upgrade(steps);
};

/**
 * Runs 'steps' unseed migrations.
 *
 * @param steps How many migration steps to run. Defaults to all.
 */
export const unseedDatabase = async (steps: number): Promise<void> => {
  const migration = new Migrations();

  await migration.init({
    tableName: "seeds",
    silent: true,
    path: path.join(__dirname, "..", "seeds"),
  });
  await migration.downgrade(steps);
};

/**
 * Runs 'steps' downgrade migrations.
 *
 * @param steps How many migration steps to run. Defaults to all.
 */
export const downgradeDatabase = async (steps: number): Promise<void> => {
  const migration = new Migrations();

  await migration.init({
    tableName: "migrations",
    silent: true,
    path: path.join(__dirname, "..", "migrations"),
  });
  await migration.downgrade(steps);
};

/**
 * Rebuilds database by downgrading everything and re-running migrations.
 */
export const rebuildDatabase = async (): Promise<void> => {
  await unseedDatabase(-1);
  await downgradeDatabase(-1);
  await upgradeDatabase();
};

/**
 * Clears database by downgrading everything and re-running migrations.
 */
export const clearDatabase = async (): Promise<void> => {
  await downgradeDatabase(-1);
  await upgradeDatabase();
};

/**
 * Runs all downgrade migrations.
 */
export const dropDatabase = async (): Promise<void> => {
  await downgradeDatabase(-1);
};
