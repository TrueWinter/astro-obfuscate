import { Type } from './Type';

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

export type ElementFunction = (deobfuscated: string, text?: string | null) => HTMLElement;

export default class ObfuscatedData extends HTMLElement {
  connectedCallback() {
    const xor = parseInt(this.dataset.xor as string, 10);

    let deobfuscatedData: string,
        deobfuscatedText: string | null;

    try {
      deobfuscatedData = deobfuscate(this.dataset.obfuscated as string, xor);
      deobfuscatedText = this.dataset.text ?
        deobfuscate(this.dataset.text as string, xor) : null;
    } catch (e) {
      this.replaceChildren(this.#createErrorElement());
      throw e;
    }
    
    setTimeout(() => {
      const elem = this.#createElement(deobfuscatedData, deobfuscatedText);
      this.replaceChildren(elem || this.#createErrorElement());
    }, 500);
  }

  #createErrorElement() {
    const elem = document.createElement('span');
    elem.innerText = '[an error occurred]';
    return elem;
  }

  static #ELEMENT_FUNCTIONS:
    Record<string, (deobfuscated: string, text?: string | null) => HTMLElement> = {
      [Type.EMAIL.toString()]: (deobfuscated, text) => {
        const elem = document.createElement('a');
        elem.href = `mailto:${deobfuscated}`;
        elem.innerText = text || deobfuscated;
        return elem;
      },

      [Type.PHONE.toString()]: (deobfuscated, text = deobfuscated) => {
        const elem = document.createElement('a');
        elem.href = `tel:${deobfuscated}`;
        elem.innerText = text || deobfuscated;
        return elem;
      },

      [Type.TEXT.toString()]: (deobfuscated) => {
        const elem = document.createElement('span');
        elem.innerText = deobfuscated;
        return elem;
      }
    }

  static registerElement(id: string, fn: ElementFunction) {
    if (id in ObfuscatedData.#ELEMENT_FUNCTIONS) {
      throw new Error('An element function with that ID already exists');
    }

    ObfuscatedData.#ELEMENT_FUNCTIONS[id] = fn;
  }

  #createElement(deobfuscated: string, text?: string | null) {
    if (!this.dataset.type) return;
    if (!(this.dataset.type in ObfuscatedData.#ELEMENT_FUNCTIONS)) {
      console.error(`Custom type ${this.dataset.type} has no element function registered`);
    }

    return ObfuscatedData.#ELEMENT_FUNCTIONS[this.dataset.type]?.(deobfuscated, text);
  }
}