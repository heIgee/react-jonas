export const flagEmojiToPNG = (flag: string) => {
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
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt='flag' />
    );
  } catch (err) {
    return flag;
  }
};
