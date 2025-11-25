# astro-obfuscate

astro-obfuscate is a set of components that prevent spam bots from finding email addresses, phone numbers, or other text that you wish to hide. Both SSG and SSR modes are supported.

## Components

There are four components included in this library:

- ObfuscatedEmail: Obfuscates email addresses, creating a `mailto` link upon deobfuscation
- ObfuscatedPhone: Obfuscates phone numbers, creating a `tel` link upon deobfuscation
- ObfuscatedText: Obfuscates text, creating a `span` element upon deobfuscation
- ObfuscatedData: Base component, can be used to create custom obfuscated elements

## Usage

```astro
---
import {
  ObfuscatedEmail,
  ObfuscatedPhone,
  ObfuscatedText,
  ObfuscatedData
} from 'astro-obfuscate/components';
---

<!-- Email -->
<!-- Result: <a href="mailto:email@example.com">email@example.com</a> -->
<ObfuscatedEmail email="email@example.com" />
<!-- Result: <a href="mailto:email@example.com">email</a> -->
<ObfuscatedEmail email="email@example.com" text="email" />

<!-- Phone -->
<!-- Result: <a href="tel:+1-541-555-0123">+1-541-555-0123</a> -->
<ObfuscatedPhone phone="+1-541-555-0123" />
<!-- Result: <a href="tel:+1-541-555-0123">+1 (541) 555-0123</a> -->
<ObfuscatedPhone phone="+1-541-555-0123" text="+1 (541) 555-0123" />

<!-- Text -->
<!-- Result: <span>Sensitive information</span> -->
<ObfuscatedText text="Sensitive information" />

<!-- Custom obfuscated element -->
<script>
  import ObfuscatedData from 'astro-obfuscate/client';
  ObfuscatedData.registerElement('link', (deobfuscated, text) => {
    const elem = document.createElement('a');
    elem.href = deobfuscated;
    elem.innerText = text || deobfuscated;
    return elem;
  });
</script>
<!-- Result: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Free stuff</a> -->
<ObfuscatedData data="https://www.youtube.com/watch?v=dQw4w9WgXcQ" text="Free stuff" type="link" />
```

### Styling

All obfuscated components accept a `class` and `noscriptClass` attribute to allow styling. These classes are added to the `obfuscated-data` and `noscript` elements, respectively.

```astro
<ObfuscatedEmail email="email@example.com" class="email-text" />

<style>
  :global(.email-text a) {
    font-style: italic;
    font-family: Helvetica;
  }
</style>
```

## How does it work?

The script will wait 500ms returning the result of deobfuscation in a custom element (`obfuscated-data`). During this time, `[please wait]` will be displayed in its place. If JavaScript is disabled, or deobfuscation fails, an error message is shown in its place.

See the `server.ts` file for the obfuscation implementation.

This method of obfuscation should work against most bots. More sophisticated bots may bypass any client-side obfuscation methods.

