import { Command } from "commander";

export const init = new Command()
  .name("init")
  .description("Initialize vibestack in your project")
  .action(() => {
    console.log("Work in progress. Coming soon!");
  });
