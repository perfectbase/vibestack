# Adding Support for Your Tool in VibeStack

This guide will help you create and share custom tool configurations that others can use with VibeStack.

## Tool Definition Structure

Each tool in VibeStack requires:

1. A JSON definition file
2. One or more Markdown files with instructions, cheatsheets, etc.

### Creating a Definition File

Create a json definition file with the following structure:

```json
{
  "category": "your-category",
  "name": "your-tool-name",
  "files": [
    {
      "frameworks": ["framework-name"],
      "name": "displayed-filename.md",
      "url": "https://your-domain.com/path/to/file.md"
    }
    // Add more files as needed
  ]
}
```

- **category**: One of the predefined categories (`setup`, `style`, `storage`, `auth`, `database`, `payments`, `ai`) or a custom category
- **name**: The name of your tool
- **files**: An array of file definitions with:
  - **frameworks**: Either a single framework name, an array of frameworks, or `"_all"` for framework-agnostic content
  - **name**: The display name for the file (how it will appear in the user's project)
  - **url**: Public URL where the file content can be accessed

### Creating Instruction Files

Create Markdown files for your tool that include:

1. **Setup instructions**: How to install and configure the tool
2. **Usage examples**: Common patterns and code snippets
3. **API references**: Key functions and parameters
4. **Troubleshooting**: Common issues and solutions

Each file should be tailored to a specific framework when relevant.

## Hosting Your Definition

Host your json definition and all referenced Markdown files on a publicly accessible URL.

## Example Directory Structure

```
my-tool/
├── tool.json
├── nextjs-setup.md
├── start-setup.md
├── components.md
└── cheatsheet.md
```

## Sharing Your Tool

Once your files are hosted, users can add your tool using:

```bash
npx vibestack add https://your-domain.com/path/to/tool.json
```

## Best Practices

1. Keep instruction files concise and focused
2. Include real-world examples
3. Provide framework-specific instructions when needed
4. Test your definition before sharing
