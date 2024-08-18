export const flagEmojiToCode = (flag: string) => {
  try {
    const countryCode = Array.from(flag)
      .map((codeUnit) => {
        const codePoint = codeUnit.codePointAt(0);
        if (codePoint === undefined) {
          throw new Error('Invalid flag emoji');
        }
        return String.fromCharCode(codePoint - 127397).toLowerCase();
      })
      .join('');
    return countryCode;
  } catch (err) {
    return flag;
  }
};
