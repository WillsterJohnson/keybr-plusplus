import { logger } from "../lib/logger/index.js";
import { time } from "../lib/time/index.js";
import { homepageStats } from "./applets/homepageStats/index.js";
import { lockIndicator } from "./applets/lockIndicators.js";

async function main() {
  while (document.readyState !== "complete") await new Promise((r) => setTimeout(r, time(1, "s")));

  if (typeof browser === "undefined") globalThis.browser = chrome;

  lockIndicator();
  homepageStats();

  logger.log("Extension loaded");
}

main();
