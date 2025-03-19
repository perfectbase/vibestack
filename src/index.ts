import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";

const program = new Command();

program
  .name("vibestack")
  .description(
    "Easily add instructions, cheat sheets and rules for your favorite tools tailored for your framework."
  )
  .version("0.0.5");

// Register commands
initCommand(program);
addCommand(program);

program.parse();
