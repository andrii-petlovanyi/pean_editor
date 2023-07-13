export const wrapInImg = (src: string, alt: string): string => {
  const articleTextarea = document.getElementById(
    "article_editor"
  ) as HTMLTextAreaElement;

  if (!articleTextarea) {
    return '';
  }

  const { selectionStart, selectionEnd, value } = articleTextarea;

  const beforeText = value.substring(0, selectionStart);
  const afterText = value.substring(selectionEnd);

  return `${beforeText}<img src="${src}" alt="${alt}"}/>${afterText}`;
};
