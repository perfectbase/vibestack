import { Command } from "commander";

export const addCommand = (program: Command): void => {
  program
    .command("add")
    .description("Add instructions for a new tool to your project")
    .action(() => {
      console.log("Work in progress. Coming soon!");
    });
};
