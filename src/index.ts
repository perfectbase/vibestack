import { Command } from "commander";

const program = new Command();

program
  .name("vibestack")
  .description(
    "Easily add instructions, cheat sheets and rules for your favorite tools tailored for your framework."
  )
  .version("0.0.4");

program
  .command("init")
  .description("Initialize a new vibestack project")
  .action(() => {
    console.log("Hello World! Vibestack initialized successfully.1");
  });

program.parse();
