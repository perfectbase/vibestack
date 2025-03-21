import { VibeDef } from "../types.js";

export const registry: VibeDef[] = [
  {
    category: "storage",
    name: "edgestore",
    files: [
      {
        frameworks: "tanstack-react-start",
        name: "edgestore-setup.md",
        url: "https://vibestack.app/r/storage/edgestore/start-setup.md",
      },
      {
        frameworks: "nextjs",
        name: "edgestore-setup.md",
        url: "https://vibestack.app/r/storage/edgestore/nextjs-setup.md",
      },
      {
        frameworks: "_all",
        name: "edgestore-components.md",
        url: "https://vibestack.app/r/storage/edgestore/components.md",
      },
      {
        frameworks: "_all",
        name: "edgestore-cheat-sheet.md",
        url: "https://vibestack.app/r/storage/edgestore/cheat-sheet.md",
      },
    ],
  },
  {
    category: "auth",
    name: "better-auth",
    files: [
      {
        frameworks: "nextjs",
        name: "better-auth-setup.md",
        url: "https://vibestack.app/r/nextjs/auth/better-auth-setup.md",
      },
      {
        frameworks: "tanstack-react-start",
        name: "better-auth-setup.md",
        url: "https://vibestack.app/r/tanstack-react-start/auth/better-auth-setup.md",
      },
    ],
  },
  {
    category: "database",
    name: "drizzle",
    files: [
      {
        frameworks: "nextjs",
        name: "drizzle-setup.md",
        url: "https://vibestack.app/r/nextjs/database/drizzle-setup.md",
      },
      {
        frameworks: "nextjs",
        name: "drizzle-cheatsheet.md",
        url: "https://vibestack.app/r/nextjs/database/drizzle-cheatsheet.md",
      },
      {
        frameworks: "tanstack-react-start",
        name: "drizzle-setup.md",
        url: "https://vibestack.app/r/tanstack-react-start/database/drizzle-setup.md",
      },
      {
        frameworks: "tanstack-react-start",
        name: "drizzle-cheatsheet.md",
        url: "https://vibestack.app/r/tanstack-react-start/database/drizzle-cheatsheet.md",
      },
    ],
  },
  {
    category: "payments",
    name: "stripe",
    files: [
      {
        frameworks: "nextjs",
        name: "stripe-setup.md",
        url: "https://vibestack.app/r/nextjs/payments/stripe-setup.md",
      },
    ],
  },
  {
    category: "ai",
    name: "ai-sdk-setup",
    files: [
      {
        frameworks: "tanstack-react-start",
        name: "ai-sdk-setup.md",
        url: "https://vibestack.app/r/tanstack-react-start/ai/ai-sdk-setup.md",
      },
    ],
  },
];
