export const readingMinutes = (body: string): number => {
  const text = body
    .replaceAll(/```[\s\S]*?```/gu, " ")
    .replaceAll(/[#>*_\-`[\]()]/gu, " ")
    .replaceAll(/\s+/gu, "");
  const chars = text.length;
  return Math.max(1, Math.ceil(chars / 500));
};
