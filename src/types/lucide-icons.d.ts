// Raw icon geometry from lucide-react's per-icon modules (used to draw icons in OG images,
// where client components can't run).
declare module "lucide-react/dist/esm/icons/*.mjs" {
  export const __iconData: { name: string; node: [string, Record<string, string>][] };
}
