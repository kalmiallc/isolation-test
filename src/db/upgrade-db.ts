import * as readline from "readline";
import { env } from "../config/env";
import { bgYellow, black } from "colors/safe";
import { upgradeDatabase } from "./helpers";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let steps = 0;

const run = async (stepCount: number) => {
  await upgradeDatabase(stepCount);
};

rl.question(
  `You are about to upgrade database ${bgYellow(
    black(` ${env.MYSQL_DB} @ ${env.MYSQL_HOST} `)
  )}.

Set number of versions to upgrade ('Y' for all, '<number>' for number of versions, 'N' to exit):`,
  (answer) => {
    steps = parseInt(answer, 10);
    if (answer.toUpperCase() === "Y") {
      steps = 0;
      console.log("Upgrading to LATEST version.");
    } else if (steps) {
      console.log(`Upgrading for ${steps} version(s).`);
    } else {
      console.log("Invalid input. Exiting.");
      process.exit(0);
    }

    rl.close();

    run(steps)
      .then(() => {
        console.log("Complete!");
        process.exit(0);
      })
      .catch((err) => {
        console.log(err);
        process.exit(1);
      });
  }
);
