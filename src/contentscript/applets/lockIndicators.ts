import { applet } from "../applet.js";

class LockIndicator {
  constructor() {
    this.setLightState(false);
    window.addEventListener("keydown", (event) => {
      if (event.key === "CapsLock") {
        this.setLightState(!this.capsLocked);
      } else {
        this.setLightState(event.getModifierState("CapsLock"));
      }
    });
  }

  protected capsLocked = false;

  protected setLightState(state: boolean): void {
    this.capsLocked = state;
    const light = this.capsLight;
    if (!light) return;
    light.setAttribute(
      "fill",
      state ? "var(--LessonKey--fast__color)" : "currentColor",
    );
  }

  protected get capsLight() {
    const capsLock =
      document.querySelector<SVGElement>("svg[data-key='CapsLock']") ??
      undefined;
    if (!capsLock) return;

    const capsLockLight = capsLock.querySelector<SVGElement>(".indicator");
    if (capsLockLight) return capsLockLight;

    const newCapsLockLight = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    newCapsLockLight.setAttribute("class", "indicator");
    newCapsLockLight.setAttribute("width", "5");
    newCapsLockLight.setAttribute("height", "5");
    newCapsLockLight.setAttribute("x", "5");
    newCapsLockLight.setAttribute("y", "5");
    newCapsLockLight.setAttribute("fill", "currentColor");

    capsLock.appendChild(newCapsLockLight);
    return newCapsLockLight;
  }
}

export const lockIndicator = applet(["/"], LockIndicator);
