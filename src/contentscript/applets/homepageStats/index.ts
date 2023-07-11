import { time } from "../../../lib/time/index.js";
import { applet } from "../../applet.js";
import StatsDisplay from "./statsDisplay.svelte";

class HomepageStats {
  constructor() {
    this.init();
    this.frame = document.createElement("iframe");
    this.frame.src = "https://www.keybr.com/profile";
    this.frame.style.display = "none";
    document.body.appendChild(this.frame);

    window.addEventListener("focus", () => this.shouldPause--);
    window.addEventListener("blur", () => this.shouldPause++);
    window.addEventListener("keypress", () => this.pause());
    this.resume();
  }

  protected async init() {
    let mainbox = document.querySelector<HTMLDivElement>("main > div");
    while (!mainbox) {
      await new Promise((r) => setTimeout(r, time(1, "s")));
      mainbox = document.querySelector("main > div");
    }
    mainbox.style.marginBottom = "0";
    this.statsDisplay = new StatsDisplay({
      target: mainbox.appendChild(document.createElement("div")),
    });
  }

  protected frame: HTMLIFrameElement;

  private _shouldPause = 0;
  protected get shouldPause() {
    return this._shouldPause;
  }

  protected set shouldPause(value) {
    this._shouldPause = value;
    if (this._shouldPause < 0) this._shouldPause = 0;
    else if (this._shouldPause === 0) this.resume();
  }

  protected pause() {
    this.shouldPause++;
    setTimeout(() => this.shouldPause--, time(2, "s"));
  }

  protected running = false;
  protected async resume() {
    if (this.running) return;
    this.running = true;
    let i = 0;
    setInterval(() => {
      i = (i + 1) % 10;
      if (this.shouldPause > 0) return;
      if (i === 0) this.showStats();
    }, time(500, "f"));
  }

  protected async showStats() {
    await this.refreshFrame();
    const stats = await this.getStats();
    this.statsDisplay.$set({ stats });
  }

  protected async refreshFrame() {
    this.frame.contentWindow?.location.reload();
    while (this.frame.contentWindow?.document.readyState !== "complete")
      await new Promise((r) => setTimeout(r, time(1, "s")));
  }

  protected async getStats() {
    const stats = window.frames[0]!.document.querySelector<HTMLDivElement>("main > div > div")!;

    const all = stats.children[2];
    const day = stats.children[4];

    const allHtml = all.outerHTML;
    const dayHtml = day.outerHTML;

    return { all: allHtml, day: dayHtml };
  }

  private statsDisplay!: StatsDisplay;
}

export const homepageStats = applet(["/"], HomepageStats);
