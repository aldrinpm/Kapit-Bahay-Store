/**
 * Minimal class-name merge helper.
 *
 * Mirrors the tiny `cn` used by 21st.dev / shadcn components without pulling in
 * the clsx + tailwind-merge dependencies. Falsy values are dropped and results
 * are de-duplicated so conditional Tailwind classes compose cleanly.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  const out: string[] = [];
  for (const value of classes) {
    if (!value) continue;
    for (const part of String(value).split(' ')) {
      if (part && !out.includes(part)) out.push(part);
    }
  }
  return out.join(' ');
}
