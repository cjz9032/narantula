import fs from "fs";

export function writeListToCSV(header: string[], data: string[][], filename: string): void {
  fs.writeFileSync(filename,  header.join(",") + "\n" + data.map((row) => row.join(",")).join("\n"));
}
