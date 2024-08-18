export const codeToFlagEmoji = (code: string): string => {
  try {
    const flagEmoji = Array.from(code.toUpperCase())
      .map((char) => {
        const codePoint = char.codePointAt(0);
        if (codePoint === undefined) {
          throw new Error('Invalid country code');
        }
        return String.fromCodePoint(codePoint + 127397);
      })
      .join('');
    return flagEmoji;
  } catch (err) {
    return code;
  }
};
