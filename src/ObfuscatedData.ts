import { Type } from './Type';
import { deobfuscate } from './obfuscate';

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

  #ELEMENT_FUNCTIONS:
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

  #createElement(deobfuscated: string, text?: string | null) {
    if (!this.dataset.type) return;
    return this.#ELEMENT_FUNCTIONS[this.dataset.type]?.(deobfuscated, text);
  }
}