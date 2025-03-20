import { Command } from "commander";
import { init } from "./commands/init.js";
import { add } from "./commands/add.js";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

const program = new Command()
  .name("vibestack")
  .description(
    "Easily add instructions, cheat sheets and rules for your favorite tools tailored for your framework."
  )
  .version("0.0.31");

program.addCommand(init).addCommand(add);

program.parse();
