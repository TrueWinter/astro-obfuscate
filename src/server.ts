export function generateXorKey() {
  return Math.floor(Math.random() * (16 - 1)) + 1;
}

export function obfuscate(email: string, xor: number) {
  return btoa(email)
  .split('')
  .map((e, i) => (
      (e.charCodeAt(0) ^ (i % 256)) ^ xor
    )
    .toString(16)
    .padStart(2, '0'))
  .join('');
}
