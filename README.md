# Lightbox

Mostly unstyled barebones lightbox library.

## Installation

```bash
npm install @mvsde/lightbox focus-trap
```

## JavaScript

```js
import { Lightbox, LightboxLink } from '@mvsde/lightbox'

const lightbox = new Lightbox({
  element: document.querySelector('#lightbox')
})

lightbox.init()

const lightboxLinks = document.querySelectorAll('.js-lightbox-link')

for (const link of lightboxLinks) {
  new LightboxLink({ element: link, target: lightbox }).init()
}
```

## CSS

```css
@import '@mvsde/lightbox';
```

## Trigger link HTML

```html
<a
  class="js-lightbox-link"
  href="https://source.unsplash.com/NRQV-hBF10M/2000x1300"
  data-alt="River in the foreground cutting through grassland. Pine trees in the middle ground slightly obscured by mist. Large mountains to the left and right in the background, framing a pale orange sky at dawn."
  data-caption="Photo by <a href='https://unsplash.com/photos/NRQV-hBF10M'>Bailey Zindel on Unsplash</a>."
>
  Yosemite valley at dawn
</a>
```

## Popup HTML

The `data-padding` attribute is optional and defaults to `32`.

```html
<div
  id="lightbox"
  class="lightbox"
  data-padding="20"
>
  <div class="lightbox__inner">

    <button
      class="lightbox__close"
      aria-label="Close image"
    >×</button>

    <figure class="lightbox__figure">
      <img class="lightbox__image">
      <figcaption class="lightbox__caption"></figcaption>
    </figure>

  </div>
</div>
```
