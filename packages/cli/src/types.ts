const categories = [
  "setup",
  "style",
  "storage",
  "auth",
  "database",
  "payments",
  "ai",
  // ...more to come
] as const;

export type Category = (typeof categories)[number] | (string & {});

const frameworks = [
  "tanstack-react-start",
  "nextjs",
  // ...more to come
] as const;

export type Framework = (typeof frameworks)[number] | (string & {});

export type VibeDef = {
  category: Category; // Allow other strings as well
  name: string;
  files: VibeFile[];
};

export type VibeFile = {
  framework: Framework; // Allow other strings as well
  name: string;
  url: string;
};
