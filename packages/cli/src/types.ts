export type VibeDef = {
  framework: string;
  category: string;
  name: string;
  files: VibeFile[];
};

export type VibeFile = {
  name: string;
  url: string;
};
