import { Command } from "commander";

export const initCommand = (program: Command): void => {
  program
    .command("init")
    .description("Initialize vibestack in your project")
    .action(() => {
      console.log("Work in progress. Coming soon!");
    });
};
