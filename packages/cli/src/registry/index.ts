import { VibeDef } from "../types.js";

export const registry: VibeDef[] = [
  {
    category: "storage",
    name: "edgestore",
    files: [
      {
        frameworks: "tanstack-react-start",
        name: "edgestore-setup.md",
        url: "http://localhost:4321/r/storage/edgestore/start-setup.md",
      },
    ],
  },
  {
    category: "auth",
    name: "clerk",
    files: [
      {
        frameworks: "nextjs",
        name: "clerk-setup.md",
        url: "http://localhost:4321/r/nextjs/auth/clerk-setup.md",
      },
      {
        frameworks: "tanstack-react-start",
        name: "clerk-setup.md",
        url: "http://localhost:4321/r/tanstack-react-start/auth/clerk-setup.md",
      },
    ],
  },
  {
    category: "database",
    name: "prisma",
    files: [
      {
        frameworks: "nextjs",
        name: "prisma-setup.md",
        url: "http://localhost:4321/r/nextjs/database/prisma-setup.md",
      },
      {
        frameworks: "nextjs",
        name: "prisma-cheatsheet.md",
        url: "http://localhost:4321/r/nextjs/database/prisma-cheatsheet.md",
      },
      {
        frameworks: "tanstack-react-start",
        name: "prisma-setup.md",
        url: "http://localhost:4321/r/tanstack-react-start/database/prisma-setup.md",
      },
      {
        frameworks: "tanstack-react-start",
        name: "prisma-cheatsheet.md",
        url: "http://localhost:4321/r/tanstack-react-start/database/prisma-cheatsheet.md",
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
        url: "http://localhost:4321/r/nextjs/database/drizzle-setup.md",
      },
      {
        frameworks: "nextjs",
        name: "drizzle-cheatsheet.md",
        url: "http://localhost:4321/r/nextjs/database/drizzle-cheatsheet.md",
      },
      {
        frameworks: "tanstack-react-start",
        name: "drizzle-setup.md",
        url: "http://localhost:4321/r/tanstack-react-start/database/drizzle-setup.md",
      },
      {
        frameworks: "tanstack-react-start",
        name: "drizzle-cheatsheet.md",
        url: "http://localhost:4321/r/tanstack-react-start/database/drizzle-cheatsheet.md",
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
        url: "http://localhost:4321/r/nextjs/payments/stripe-setup.md",
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
        url: "http://localhost:4321/r/tanstack-react-start/ai/ai-sdk-setup.md",
      },
    ],
  },
];
