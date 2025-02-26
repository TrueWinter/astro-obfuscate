# astro-obfuscate

astro-obfuscate is a set of components that prevent spam bots from finding email addresses, phone numbers, or other text that you wish to hide. Both SSG and SSR modes are supported.

## Components

There are three components included in this library:

- ObfuscatedEmail: Obfuscates email addresses, creating a `mailto` link upon deobfuscation
- ObfuscatedPhone: Obfuscates phone numbers, creating a `tel` link upon deobfuscation
- ObfuscatedText: Obfuscates text, creating a `span` element upon deobfuscation

## Usage

```astro
---
import { ObfuscatedEmail, ObfuscatedPhone, ObfuscatedText } from 'astro-obfuscate';
---

<!-- Email -->
<ObfuscatedEmail email="email@example.com" /> <!-- Result: <a href="mailto:email@example.com">email@example.com</a> -->
<ObfuscatedEmail email="email@example.com" text="email" /> <!-- Result: <a href="mailto:email@example.com">email</a> -->

<!-- Phone -->
<ObfuscatedPhone phone="+1-541-555-0123" /> <!-- Result: <a href="tel:+1-541-555-0123">+1-541-555-0123</a> -->
<ObfuscatedPhone phone="+1-541-555-0123" text="+1 (541) 555-0123" /> <!-- Result: <a href="tel:+1-541-555-0123">+1 (541) 555-0123</a> -->

<!-- Text -->
<ObfuscatedText text="Sensitive information" /> <!-- Result: <span>Sensitive information</span> -->
```

The (de)obfuscation methods are also exported as `obfuscate` to allow for custom elements to be created.

## How does it work?

The script will wait 500ms returning the result of deobfuscation in a custom element (`obfuscated-data`). During this time, `[please wait]` will be displayed in its place. If JavaScript is disabled, or deobfuscation fails, an error message is shown in its place.

See the `obfuscate.ts` file for the obfuscation implementation.

This method of obfuscation should work against most bots. More sophisticated bots may bypass any client-side obfuscation methods.

