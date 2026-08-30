import fs from "fs";
import path from "path";

/**
 * Server-side source code loader for Polaris Playground.
 * Reads the actual file content from disk to guarantee 0 code duplication.
 */
export function getSourceCode(relativeFilePath: string): string {
  try {
    const fullPath = path.join(process.cwd(), relativeFilePath);
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, "utf-8");
    }
    return `// Source file not found: ${relativeFilePath}`;
  } catch (error) {
    console.error(`Error reading source file ${relativeFilePath}:`, error);
    return `// Error loading ${relativeFilePath}`;
  }
}
