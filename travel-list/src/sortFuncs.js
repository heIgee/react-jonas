export const sortFuncs = {
  byInput: () => 0,
  byDescription: (a, b) =>
    a.description.toLowerCase().localeCompare(b.description.toLowerCase()),
  byQuantity: (a, b) => a.quantity - b.quantity,
  byPacked: (a, b) => a.isPacked - b.isPacked,
};
