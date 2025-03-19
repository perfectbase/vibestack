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

// Copy README and LICENSE from the root of the monorepo
const monorepoRoot = path.resolve("../..");
const readmePath = path.join(monorepoRoot, "README.md");
const licensePath = path.join(monorepoRoot, "LICENSE.md");

if (fs.existsSync(readmePath)) {
  fs.copyFileSync(readmePath, path.resolve("./README.md"));
  console.log("Copied README.md from monorepo root");
} else {
  console.warn("README.md not found in monorepo root");
}

if (fs.existsSync(licensePath)) {
  fs.copyFileSync(licensePath, path.resolve("./LICENSE.md"));
  console.log("Copied LICENSE.md from monorepo root");
} else {
  console.warn("LICENSE.md not found in monorepo root");
}
