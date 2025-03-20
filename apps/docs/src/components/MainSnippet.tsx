import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type PackageManager = "npm" | "pnpm" | "bun" | "yarn";

export function MainSnippet() {
  const [copied, setCopied] = useState(false);
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");

  const commandMap: Record<PackageManager, string> = {
    npm: "npx vibestack@latest add",
    pnpm: "pnpm dlx vibestack@latest add",
    bun: "bunx vibestack@latest add",
    yarn: "npx vibestack@latest add",
  };

  const codeSnippet = commandMap[packageManager];

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-800 rounded-lg py-4 pl-8 pr-4 flex items-center justify-between mx-auto">
      <code className="text-white font-mono">{codeSnippet}</code>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="ml-4 p-2"
            aria-label="Select package manager and copy"
          >
            {copied ? (
              <CheckIcon className="text-green-400" />
            ) : (
              <CopyIcon className="text-gray-400 hover:text-white" />
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setPackageManager("npm");
              handleCopy();
            }}
          >
            npm
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setPackageManager("pnpm");
              handleCopy();
            }}
          >
            pnpm
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setPackageManager("bun");
              handleCopy();
            }}
          >
            bun
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setPackageManager("yarn");
              handleCopy();
            }}
          >
            yarn
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
