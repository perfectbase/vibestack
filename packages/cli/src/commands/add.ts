import { Command } from "commander";

export const add = new Command()
  .name("add")
  .description("Add instructions for a new tool to your project")
  .action(() => {
    console.log("Work in progress. Coming soon!");
  });
