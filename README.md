# cg-aos

✨ **cg-aos** is a modern, zero-dependency **Animate On Scroll** library.  
It’s a fresh re-imagining of [AOS](https://www.npmjs.com/package/aos), rebuilt for 2025+: smaller, faster, and free of legacy JavaScript.

- ⚡ **Lightweight**: no dependencies, ~2 KB min+gzip
- 🖼 **Simple API**: just add `data-cg` attributes
- 🕹 **Customizable**: duration, delay, easing, stagger
- 🧑‍🦽 **Accessible**: respects `prefers-reduced-motion`
- 🔄 **Dynamic**: auto-observes elements added later
- 📦 **Modern**: ships as ES Module (no Babel / legacy code)

---

## 🚀 Installation

```bash
npm install cg-aos
```

*(Optional: if you prefer Yarn or pnpm, you can install with `yarn add cg-aos` or `pnpm add cg-aos` after installing those package managers.)*

---

## 📖 Quick Start

Include the CSS (optional baseline styles) and initialize the script:

```html
<link rel="stylesheet" href="/node_modules/cg-aos/cg-aos.css">

<script type="module">
  import { cgAOS } from 'cg-aos';

  cgAOS.init({
    once: true,                    // animate only once
    rootMargin: '0px 0px -10% 0px' // viewport margin
  });
</script>

<section data-cg="fade-up" data-cg-duration="600" data-cg-delay="120">
  Hello CODEGENIE 🚀
</section>
```

---

## 🎨 Data Attributes

| Attribute           | Type     | Default                  | Description                                    |
|---------------------|--------- |--------------------------|------------------------------------------------|
| `data-cg`           | string   | `fade`                   | Animation type (`fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `zoom-in`, `zoom-out`) |
| `data-cg-duration`  | number   | `500` (ms)               | Animation duration in milliseconds             |
| `data-cg-delay`     | number   | `0`                      | Delay before animation starts (ms)             |
| `data-cg-easing`    | string   | `cubic-bezier(.2,.7,.2,1)` | CSS easing function                           |
| `data-cg-once`      | boolean  | `true`                   | Animate only once (`true`) or repeat on scroll (`false`) |
| `data-cg-stagger`   | number   | `0`                      | Stagger children animations (ms per child)     |

---

## ⚙️ JavaScript API

```js
import { cgAOS } from 'cg-aos';

const aos = cgAOS.init({
  selector: '[data-cg]', // CSS selector
  once: true,            // animate only once
  autoObserve: true,     // watch new elements added to DOM
  reducedMotion: 'skip'  // 'skip' | 'instant' | 'none'
});

// Later you can control it programmatically:
aos.observe(document.querySelector('#new-el'));
aos.unobserve(document.querySelector('#old-el'));
aos.destroy();
```

---

## 🧑‍🦽 Accessibility

- Respects **`prefers-reduced-motion`** automatically.
- Options:
  - `reducedMotion: 'skip'` → disable animations
  - `reducedMotion: 'instant'` → show instantly (no animation)
  - `reducedMotion: 'none'` → always animate

---

## 🔧 Supported Animations

- `fade`
- `fade-up`
- `fade-down`
- `fade-left`
- `fade-right`
- `zoom-in`
- `zoom-out`

➡️ You can extend this with your own CSS and `data-cg` values.

---

## 🛠 Development

Clone and run locally:

```bash
git clone https://github.com/codegenie-be/cg-aos.git
cd cg-aos
npm install
```

Run a local test:

```bash
npm link
# in your test project
npm link cg-aos
```

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!  
Feel free to open an [issue](https://github.com/codegenie-be/cg-aos/issues) or a pull request.

---

## 📦 Publishing (maintainers only)

To release a new version:

```bash
npm version patch    # or minor / major
npm publish
```

---

## 📜 License

MIT © 2025 [CODEGENIE](https://www.codegenie.be)

---

### 💡 Why cg-aos?

AOS (2017) ships with legacy JavaScript and hasn’t been updated in years.  
**cg-aos** is a 2025 rebuild:

- No jQuery, no Babel helpers.
- ESNext, lightweight, future-proof.
- Declarative attributes, clean modern API.
