export const splitTextIntoChunks = async (
  text: string,
  chunkSize = 500
): Promise<string[]> => {
  const chunks: string[] = [];
  let start = 0;

  while (start < text.length) {
    let end = start + chunkSize;

    // Ensure we do not cut words in half
    if (end < text.length) {
      while (end > start && text[end] !== " " && text[end] !== "\n") {
        end--;
      }
    }

    chunks.push(text.substring(start, end).trim());
    start = end + 1;
  }

  return chunks;
};
