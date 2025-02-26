// Do not write code directly here, instead use the `src` folder!
// Then, use this file to export everything you want your user to access.

import ObfuscatedEmail from './src/ObfuscatedEmail.astro';
import ObfuscatedPhone from './src/ObfuscatedPhone.astro';
import ObfuscatedText from './src/ObfuscatedText.astro';
import * as obfuscate from './src/obfuscate';

export {
  ObfuscatedEmail,
  ObfuscatedPhone,
  ObfuscatedText,
  obfuscate
};
