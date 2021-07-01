import { createFocusTrap } from 'focus-trap'
import './main.css'

const VISIBLE_CLASS = 'is-visible'
const LOADED_CLASS = 'has-loaded'

export class Lightbox {
  /**
   * Create new lightbox
   * @param {Object} options
   * @param {HTMLDivElement} options.element Container element
   */
  constructor ({ element }) {
    this.container = element
    this.img = element.querySelector('img')
    this.figure = element.querySelector('figure')
    this.caption = element.querySelector('figcaption')
    this.closeButton = element.querySelector('button')
    this.padding = parseInt(element.dataset.padding) || 32

    this.resizeObserver = new ResizeObserver(() => {
      this.setImageDimensions()
    })

    this.focusTrap = createFocusTrap(element, {
      escapeDeactivates: false
    })
  }

  /**
   * Initialize lightbox
   */
  init () {
    this.closeButton.addEventListener('click', () => this.close())

    this.img.addEventListener('load', () => {
      this.img.classList.add(LOADED_CLASS)
      this.setImageDimensions()
    })
  }

  /**
   * Open lightbox
   * @param {Object} options Options
   * @param {string} options.src Image src
   * @param {string} options.alt Image alt
   * @param {string} options.caption Image caption
   */
  open ({ src, alt, caption }) {
    this.img.src = src
    this.img.alt = alt
    this.caption.innerHTML = caption

    this.resizeObserver.observe(this.container)
    document.body.style.overflow = 'hidden'
    this.container.classList.add(VISIBLE_CLASS)

    this.container.addEventListener('transitionend', () => {
      this.focusTrap.activate()
    }, { once: true })
  }

  /**
   * Close lightbox
   */
  close () {
    this.container.classList.remove(VISIBLE_CLASS)
    this.img.classList.remove(LOADED_CLASS)
    document.body.style.overflow = ''
    this.resizeObserver.unobserve(this.container)
    this.focusTrap.deactivate()
  }

  /**
   * Set image dimensions
   */
  setImageDimensions () {
    const maxWidth = window.innerWidth - this.padding
    const maxHeight = window.innerHeight - this.padding - this.closeButton.scrollHeight - this.caption.scrollHeight

    const imageWidth = this.img.naturalWidth
    const imageHeight = this.img.naturalHeight
    const aspectRatio = imageWidth / imageHeight

    let calcWidth = 0
    let calcHeight = 0

    // If the image is larger than the viewport in any dimension,
    // it has to be scaled according to its aspect ratio.
    if (imageWidth > maxWidth || imageHeight > maxHeight) {
      if (imageWidth / maxWidth > imageHeight / maxHeight) {
        calcWidth = maxWidth
        calcHeight = maxWidth / aspectRatio
      } else {
        calcWidth = maxHeight * aspectRatio
        calcHeight = maxHeight
      }
    } else {
      calcWidth = imageWidth
      calcHeight = imageHeight
    }

    this.figure.style.width = calcWidth + 'px'
    this.img.style.height = calcHeight + 'px'
  }
}

export class LightboxLink {
  /**
   * Create new lightbox link
   * @param {Object} options
   * @param {HTMLAnchorElement} options.element Link element
   * @param {Lightbox} options.target Target lightbox
   */
  constructor ({ element, target }) {
    this.link = element
    this.src = element.href
    this.alt = element.dataset.alt
    this.caption = element.dataset.caption
    this.target = target
  }

  /**
   * Initialize lightbox link
   */
  init () {
    this.link.addEventListener('click', event => {
      event.preventDefault()
      this.open()
    })
  }

  /**
   * Open lightbox link
   */
  open () {
    this.target.open({
      src: this.src,
      alt: this.alt,
      caption: this.caption
    })
  }
}
