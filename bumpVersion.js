import fs from "node:fs";

const args = process.argv.slice(2);

const bumpType = args[0];

const manifestJson = JSON.parse(fs.readFileSync("./manifest.json", "utf8"));
const manifestJsonVersion = manifestJson.version;

const [major, minor, patch] = manifestJsonVersion.split(".");

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

manifestJson.version = newVersion;

fs.writeFileSync("./manifest.json", JSON.stringify(manifestJson, null, 2));

const updateJson = JSON.parse(fs.readFileSync("./update.json", "utf8"));
const addonKey = Object.keys(updateJson.addons)[0];
updateJson.addons[addonKey].updates.push({
  version: newVersion,
  update_link:
    "https://github.com/WillsterJohnson/keybr-plusplus/releases/latest/download/keybrpp.xpi",
});
fs.writeFileSync("./update.json", JSON.stringify(updateJson, null, 2));
