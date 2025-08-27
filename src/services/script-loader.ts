// src/services/script-loader.ts
const scriptPromises: Record<string, Promise<void> | undefined> = {};

export function loadScript(url: string): Promise<void> {
  // If we've already started loading this script, reuse the promise
  if (scriptPromises[url]) {
    return scriptPromises[url];
  }

  // Otherwise, create and store a new promise
  scriptPromises[url] = new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }

    const s = document.createElement("script");
    s.src = url;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Failed to load script ${url}`));
    document.head.appendChild(s);
  });

  return scriptPromises[url];
}
