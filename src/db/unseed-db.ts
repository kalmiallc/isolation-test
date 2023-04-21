import * as readline from "readline";
import { env } from "../config/env";
import { unseedDatabase } from "./helpers";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let steps = 1;

const run = async (stepCount: number) => {
  await unseedDatabase(stepCount);
};

rl.question(
  `You are about to un seed database ${env.MYSQL_DB} @ ${env.MYSQL_HOST}.\n Set number of versions to unseed (-1 for all, 0 to exit):`,
  (answer) => {
    steps = parseInt(answer, 10);
    if (steps) {
      console.log(`Unseeding ${steps > 0 ? steps : "ALL"} version(s).`);
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
