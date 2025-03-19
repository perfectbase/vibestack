# WIP

> This project is still under development.
> This README represents the idea of the project.
> Feel free to give me feedback or contribute to the project.

# VibeStack

Easily add instructions, cheat sheets and rules for your favorite tools tailored for your framework to use with your agentic IDE. (DX inspired by [shadcn/ui](https://github.com/shadcn-ui/ui))

## Usage

- Initialize your project configuration. The CLI should automatically detect the framework you're using.

```bash
npx vibestack init
```

(Also works with `bunx` or `pnpm dlx`)

- Add the files for a new tool

```bash
npx vibestack add
```

Then answer the CLI for the category and the tool name. The files will be added to the `./vibes` directory. Now you can just link it to the AI agent's context and you're good to go.

## Command Examples

- `npx vibestack add`: Add a new tool
- `npx vibestack add {category}`: Select a tool from a specific category
- `npx vibestack add {category} {tool}`: Add a specific tool

## Use an External URL

You can use an external URL to add a tool.

```bash
npx vibestack add https://example.com/tool.md
```

The CLI will download the file and add it to the project.
