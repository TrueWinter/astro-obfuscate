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

function hexToBytes(hex: string) {
  let bytes = [];
  for (let i = 0; i < hex.length; i += 2) {
    bytes.push(parseInt(hex.substring(i, i + 2), 16));
  }
  return bytes;
}

export function deobfuscate(obfuscated: string, xor: number) {
  return atob(
    hexToBytes(obfuscated)
      .map((e, i) => String.fromCharCode(
        (e ^ (i % 256)) ^ xor
      ))
      .join('')
  );
}
