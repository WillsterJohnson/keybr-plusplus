export function applet<T>(
  paths: string | string[],
  constructor: new (...args: any[]) => T,
) {
  if (!Array.isArray(paths)) paths = [paths];
  if (
    paths.some(
      (path) =>
        window.location.pathname === path ||
        (path.endsWith("*") &&
          window.location.pathname.startsWith(path.slice(0, -1))),
    )
  ) {
    return () => new constructor();
  }
  return () => {};
}
