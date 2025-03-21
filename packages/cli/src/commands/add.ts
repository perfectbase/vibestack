import { Command } from "commander";
import prompts from "prompts";
import kleur from "kleur";
import ora from "ora";
import { Category, Framework, VibeDef, VibeFile } from "../types.js";
import { registry } from "../registry/index.js";
import fs from "fs/promises";
import path from "path";
import fetch from "node-fetch";
import { z } from "zod";

// URL validation schema
const urlSchema = z.string().url();

// Schema for validating VibeDef from URL
const vibeFileSchema = z.object({
  frameworks: z.union([z.string(), z.array(z.string()), z.literal("_all")]),
  name: z.string(),
  url: z.string().url(),
});

const vibeDefSchema = z.object({
  category: z.string(),
  name: z.string(),
  files: z.array(vibeFileSchema),
});

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
    title: category === "storage" ? category : `${category} (coming soon)`,
    value: category,
    disabled: category !== "storage",
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
async function selectFile(tool: any): Promise<VibeFile[] | null> {
  if (tool.files.length === 1) {
    return [tool.files[0]];
  }

  // Extract all unique frameworks from the files
  const allFrameworks = new Set<Framework>();

  tool.files.forEach((file: VibeFile) => {
    if (Array.isArray(file.frameworks)) {
      file.frameworks.forEach((framework) => allFrameworks.add(framework));
    } else if (file.frameworks !== "_all") {
      allFrameworks.add(file.frameworks as Framework);
    }
  });

  const frameworks = [...allFrameworks];

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
    const frameworkFiles = tool.files.filter((file: VibeFile) => {
      if (file.frameworks === "_all") return true;
      if (Array.isArray(file.frameworks))
        return file.frameworks.includes(selectedFramework);
      return file.frameworks === selectedFramework;
    });

    return frameworkFiles.length > 0 ? frameworkFiles : null;
  }

  // If all files are for the same framework, return all files
  return tool.files;
}

// Download a file from a URL and save it to the target path
async function downloadAndSaveFile(
  file: VibeFile,
  targetDir: string
): Promise<boolean> {
  const spinner = ora(`Downloading ${file.name}...`).start();

  try {
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

// Fetch VibeDef from URL
async function fetchVibeDefFromUrl(url: string): Promise<VibeDef | null> {
  const spinner = ora(`Fetching configuration from ${url}...`).start();

  try {
    // Validate URL
    urlSchema.parse(url);

    const response = await fetch(url);

    if (!response.ok) {
      spinner.fail(`Failed to fetch configuration: ${response.statusText}`);
      return null;
    }

    const data = await response.json();

    // Validate the data against our schema
    const validatedData = vibeDefSchema.parse(data);
    spinner.succeed(`Configuration fetched successfully`);

    return validatedData;
  } catch (error: any) {
    if (error.name === "ZodError") {
      spinner.fail(`Invalid configuration format: ${error.message}`);
    } else {
      spinner.fail(`Failed to fetch configuration: ${error.message}`);
    }
    return null;
  }
}

// Process VibeDef to download files
async function processVibeDef(vibeDef: VibeDef): Promise<void> {
  console.log(
    kleur.green(`Processing ${vibeDef.name} in category ${vibeDef.category}`)
  );

  // If there's only one file, no need to select
  if (vibeDef.files.length === 1) {
    const selectedFiles = [vibeDef.files[0]];
    console.log(kleur.green(`Selected file: ${selectedFiles[0].name}`));

    // Create target directory
    const targetDir = path.join(
      process.cwd(),
      "vibes",
      vibeDef.category,
      vibeDef.name
    );
    await fs.mkdir(targetDir, { recursive: true });

    // Download and save the file
    await downloadAndSaveFile(selectedFiles[0], targetDir);
    return;
  }

  // Extract all unique frameworks from the files
  const allFrameworks = new Set<Framework>();
  vibeDef.files.forEach((file: VibeFile) => {
    if (Array.isArray(file.frameworks)) {
      file.frameworks.forEach((framework) => allFrameworks.add(framework));
    } else if (file.frameworks !== "_all") {
      allFrameworks.add(file.frameworks as Framework);
    }
  });

  const frameworks = [...allFrameworks];

  // If multiple frameworks are available, prompt for selection
  let selectedFiles: VibeFile[] = [];
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
      return;
    }

    console.log(kleur.green(`Selected framework: ${selectedFramework}`));

    // Filter files by framework
    selectedFiles = vibeDef.files.filter((file: VibeFile) => {
      if (file.frameworks === "_all") return true;
      if (Array.isArray(file.frameworks))
        return file.frameworks.includes(selectedFramework);
      return file.frameworks === selectedFramework;
    });
  } else {
    // If only one framework exists, use all files
    selectedFiles = vibeDef.files;
  }

  if (selectedFiles.length === 0) {
    console.log(
      kleur.yellow("No files found for the selected framework. Exiting...")
    );
    return;
  }

  console.log(
    kleur.green(
      `Selected ${selectedFiles.length} file(s): ${selectedFiles.map((file) => file.name).join(", ")}`
    )
  );

  // Create target directory
  const targetDir = path.join(
    process.cwd(),
    "vibes",
    vibeDef.category,
    vibeDef.name
  );
  await fs.mkdir(targetDir, { recursive: true });

  // Download and save the files
  for (const file of selectedFiles) {
    await downloadAndSaveFile(file, targetDir);
  }
}

export const add = new Command()
  .name("add")
  .description("Add instructions for a new tool to your project")
  .argument("[url]", "URL to fetch VibeDef configuration")
  .action(async (url) => {
    try {
      if (url) {
        // URL mode: fetch VibeDef from URL
        const vibeDef = await fetchVibeDefFromUrl(url);
        if (vibeDef) {
          await processVibeDef(vibeDef);
        }
        return;
      }

      // Interactive mode (original flow)
      // Step 1: Select a category
      const category = await selectCategory();
      if (!category) return;

      // Step 2: Select a tool from the category
      const tool = await selectTool(category);
      if (!tool) return;

      // Step 3: Select a file based on framework and available options
      const files = await selectFile(tool);
      if (!files || files.length === 0) return;

      console.log(kleur.green(`Selected ${files.length} file(s) for download`));

      // Step 4: Create a VibeDef and process it
      await processVibeDef({
        category: category,
        name: tool.name,
        files: files,
      });
    } catch (error: any) {
      console.error(kleur.red(`Error: ${error.message}`));
    }
  });
