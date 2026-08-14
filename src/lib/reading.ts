export function readingMinutes(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_\-`[\]()]/g, " ")
    .replace(/\s+/g, "");
  const chars = text.length;
  return Math.max(1, Math.ceil(chars / 500));
}
