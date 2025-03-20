import { Command } from "commander";
import prompts from "prompts";
import kleur from "kleur";
import ora from "ora";
import { Category, Framework, VibeFile } from "../types.js";
import { registry } from "../registry/index.js";
import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";

// Helper functions for user prompts
async function selectFromOptions<T>(
  message: string,
  options: { title: string; value: T }[]
): Promise<T | null> {
  const response = await prompts({
    type: "select",
    name: "value",
    message,
    choices: options,
  });

  return response.value || null;
}

// Select a category from the registry
async function selectCategory(): Promise<Category | null> {
  const categories = [...new Set(registry.map((tool) => tool.category))];
  const categoryChoices = categories.map((category) => ({
    title: category,
    value: category,
  }));

  const selectedCategory = await selectFromOptions<Category>(
    "Choose a category",
    categoryChoices
  );

  if (selectedCategory) {
    console.log(kleur.green(`Selected category: ${selectedCategory}`));
  } else {
    console.log(kleur.yellow("No category selected. Exiting..."));
  }

  return selectedCategory;
}

// Select a tool from the given category
async function selectTool(category: Category) {
  const tools = registry.filter((tool) => tool.category === category);

  if (tools.length === 0) {
    console.log(kleur.yellow(`No tools found for category: ${category}`));
    return null;
  }

  const toolChoices = tools.map((tool) => ({
    title: tool.name,
    value: tool,
  }));

  const selectedTool = await selectFromOptions("Choose a tool", toolChoices);

  if (selectedTool) {
    console.log(kleur.green(`Selected tool: ${selectedTool.name}`));
  } else {
    console.log(kleur.yellow("No tool selected. Exiting..."));
  }

  return selectedTool;
}

// Select a file based on framework and available options
async function selectFile(tool: any): Promise<VibeFile | null> {
  if (tool.files.length === 1) {
    return tool.files[0];
  }

  // Check if there are multiple frameworks for this tool
  const frameworks = [
    ...new Set(tool.files.map((file: VibeFile) => file.framework)),
  ];

  // If multiple frameworks are available, prompt for selection
  if (frameworks.length > 1) {
    const frameworkChoices = frameworks.map((framework) => ({
      title: framework as string,
      value: framework as Framework,
    }));

    const selectedFramework = await selectFromOptions<Framework>(
      "Choose a framework",
      frameworkChoices
    );

    if (!selectedFramework) {
      console.log(kleur.yellow("No framework selected. Exiting..."));
      return null;
    }

    console.log(kleur.green(`Selected framework: ${selectedFramework}`));

    // Filter files by framework
    const frameworkFiles = tool.files.filter(
      (file: VibeFile) => file.framework === selectedFramework
    );

    // If multiple files for the same framework, prompt user to select one
    if (frameworkFiles.length > 1) {
      const fileChoices = frameworkFiles.map((file: VibeFile) => ({
        title: file.name,
        value: file,
      }));

      const selectedFile = await selectFromOptions<VibeFile>(
        "Choose a file",
        fileChoices
      );

      if (!selectedFile) {
        console.log(kleur.yellow("No file selected. Exiting..."));
        return null;
      }

      return selectedFile;
    }

    return frameworkFiles[0];
  }

  // If all files are for the same framework but there are multiple
  const fileChoices = tool.files.map((file: VibeFile) => ({
    title: file.name,
    value: file,
  }));

  const selectedFile = await selectFromOptions<VibeFile>(
    "Choose a file",
    fileChoices
  );

  if (!selectedFile) {
    console.log(kleur.yellow("No file selected. Exiting..."));
    return null;
  }

  return selectedFile;
}

// Download a file from a URL and save it to the target path
async function downloadAndSaveFile(
  file: VibeFile,
  targetDir: string
): Promise<boolean> {
  const spinner = ora(`Downloading ${file.name}...`).start();

  try {
    console.log(file.url);
    const response = await fetch(file.url);

    if (!response.ok) {
      spinner.fail(`Failed to download file: ${response.statusText}`);
      return false;
    }

    const content = await response.text();
    const targetPath = path.join(targetDir, file.name);

    await fs.writeFile(targetPath, content);
    spinner.succeed(`File downloaded and saved to ${kleur.cyan(targetPath)}`);
    return true;
  } catch (error: any) {
    spinner.fail(`Failed to download file: ${error.message}`);
    return false;
  }
}

export const add = new Command()
  .name("add")
  .description("Add instructions for a new tool to your project")
  .action(async () => {
    try {
      // Step 1: Select a category
      const category = await selectCategory();
      if (!category) return;

      // Step 2: Select a tool from the category
      const tool = await selectTool(category);
      if (!tool) return;

      // Step 3: Select a file based on framework and available options
      const file = await selectFile(tool);
      if (!file) return;

      console.log(kleur.green(`Selected file: ${file.name}`));

      // Step 4: Create target directory
      const targetDir = path.join(process.cwd(), "vibes", category, tool.name);

      await fs.mkdir(targetDir, { recursive: true });

      // Step 5: Download and save the file
      await downloadAndSaveFile(file, targetDir);
    } catch (error: any) {
      console.error(kleur.red(`Error: ${error.message}`));
    }
  });
