export const wrapInTag = (tag: string) => {
  const articleTextarea = document.getElementById(
    "article_editor"
  ) as HTMLTextAreaElement;

  if (!articleTextarea) {
    return;
  }

  const { selectionStart, selectionEnd, value } = articleTextarea;

  if (selectionStart === selectionEnd) {
    return;
  }

  const selectedText = value.substring(selectionStart, selectionEnd);

  if (!selectedText.length) return;

  const beforeText = value.substring(0, selectionStart);
  const afterText = value.substring(selectionEnd);

  return `${beforeText}<${tag}>${selectedText}</${tag}>${afterText}`;
};
