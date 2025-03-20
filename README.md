# WIP

> This project is still under development.  
> This README represents the idea of the project.  
> Feel free to give me feedback or contribute to the project.

# VibeStack

Easily add instructions, cheat sheets and rules for your favorite tools tailored for your framework to use with your agentic IDE. (DX inspired by [shadcn/ui](https://github.com/shadcn-ui/ui))

## Usage

Run the following command to add a new tool.

```bash
npx vibestack add
```

Then answer the CLI for the category and the tool name. The files will be added to the `./vibes` directory. Now you can just link it to the AI agent's context and you're good to go.

## Use an External URL

> The official `add` command will only support one tool of each category.  
> The real value will be when companies start hosting their own files so you can add them with an external URL.

```bash
npx vibestack add https://example.com/def.json
```

The CLI will download all the files from the json definition and add them to the `./vibes` directory.

## Add Support for Your Tool

You can easily add support for your tool by making your markdown files and json definition accessible from the web. See more [here](./create-your-own.md).
