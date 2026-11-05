export function chapterFromHash(hash) {
  const match = /^#chapter-(\d+)$/.exec(hash);
  const number = match ? Number(match[1]) : NaN;
  return Number.isInteger(number) && number >= 1 && number <= 13 ? number : null;
}

export function recordChapterNavigation(history, chapter, currentHash) {
  const target = `#chapter-${chapter}`;
  if (currentHash !== target) history.pushState(null, '', target);
}
