// Vite's build base also applies to assets referenced dynamically from code.
export function publicAsset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\/+/, '');
}
