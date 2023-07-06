import fs from "node:fs";

const args = process.argv.slice(2);

const bumpType = args[0];

const packageJson = JSON.parse(fs.readFileSync("./package.json", "utf8"));
const packageJsonVersion = packageJson.version;

const [major, minor, patch] = packageJsonVersion.split(".");

let newVersion;

switch (bumpType) {
  case "major":
    newVersion = `${Number(major) + 1}.0.0`;
    break;
  case "minor":
    newVersion = `${major}.${Number(minor) + 1}.0`;
    break;
  case "patch":
    newVersion = `${major}.${minor}.${Number(patch) + 1}`;
    break;
  default:
    throw new Error("Invalid bump type");
}

packageJson.version = newVersion;

fs.writeFileSync("./package.json", JSON.stringify(packageJson, null, 2));

const manifestJson = JSON.parse(fs.readFileSync("./manifest.json", "utf8"));
manifestJson.version = newVersion;
fs.writeFileSync("./manifest.json", JSON.stringify(manifestJson, null, 2));
