import fs from "fs";
import path from "path";

// Read package.json to get the current version
const packageJsonPath = path.resolve("./package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
const currentVersion = packageJson.version;

// Path to src/index.ts
const indexTsPath = path.resolve("./src/index.ts");
const indexTsContent = fs.readFileSync(indexTsPath, "utf8");

// Replace the version in the file
const updatedContent = indexTsContent.replace(
  /\.version\("([^"]+)"\)/,
  `.version("${currentVersion}")`
);

// Write the updated content back to the file
fs.writeFileSync(indexTsPath, updatedContent);

console.log(`Updated version in src/index.ts to ${currentVersion}`);
