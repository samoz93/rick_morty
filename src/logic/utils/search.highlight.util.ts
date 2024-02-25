export const highlightSearch = (text?: string, search?: string): string => {
  if (!search || !text) return text ?? "";
  // Highlight the search term
  const reg = new RegExp(search?.trim() ?? "", "gi");
  const characterName = text.replace(
    reg,
    (match) => `<strong>${match}</strong>`
  );
  return characterName;
};
