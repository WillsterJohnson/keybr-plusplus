import { logger } from "../lib/logger/index.js";
import { lockIndicator } from "./applets/lockIndicators.js";

function main() {
  if (typeof browser === "undefined") globalThis.browser = chrome;

  lockIndicator();

  logger.log("Extension loaded");
}

if (document.readyState === "complete") main();
else window.addEventListener("load", main);
