/**
 * t10 provides basic translation functionalities in Browsers.
 */

// The translation resource
let resource = {}

// The list of avaialable locales
let availables = []

// The default language
let defaultLanguage = null

/**
 * Sets the translation resource
 * @param {Object} resource The mapping from key to translated string
 */
export const setResource = newResource => { resource = newResource }

export const getResource = () => resource

export const clearResource = () => setResource({})

/**
 * Translates the key.
 * @param {String} key The key to translate
 * @return {String} The translated string
 */
export const t = key => {
  const value = resource[key]

  if (value != null) {
    return value
  }

  return key
}

/**
 * Scan <t> tags and .t-text and .t-attr class elements and translate its contents
 * @param {?HTMLElement} dom The range to perform translation
 */
export const scan = dom => {
  if (dom == null) {
    dom = document.body
  }

  scanTTag(dom)
  scanTText(dom)
  scanTAttr(dom)
}

/**
 * remove <t> tag and insert string for key
 * @param {HTMLElement} dom The range to perform translation
 */
const scanTTag = dom => {
  [].forEach.call(dom.querySelectorAll('t'), el => {
    el.parentElement.insertBefore(new Text(t(el.textContent)), el)
    el.parentElement.removeChild(el)
  })
}

/**
 * scan .t-text class and replace text with translated string
 * @param {HTMLElement} dom The range to perform translation
 */
const scanTText = dom => {
  [].forEach.call(dom.querySelectorAll('.t-text'), el => {
    // replace text with translated string
    el.textContent = t(el.textContent)

    el.classList.remove('t-text')
    el.classList.add('t-text-done')
  })
}

const T_ATTR_REGEXP = /^t:/ // translatable attribute starts with 't:'

/**
 * scan .t-attr class and translate its attr starts with 't:' prefix
 * @param {HTMLElement} dom The range to perform translation
 */
const scanTAttr = dom => {
  [].forEach.call(dom.querySelectorAll('.t-attr'), el => {
    [].forEach.call(el.attributes, attr => {
      let label = attr.value

      el.setAttribute(attr.name, 'abcde')
      if (T_ATTR_REGEXP.test(label)) {
        label = label.replace(T_ATTR_REGEXP, '')

        // replace attribute value with translated string
        el.setAttribute(attr.name, t(label))
      }
    })

    el.classList.remove('t-attr')
    el.classList.add('t-attr-done')
  })
}

/**
 * @param {string[]} languages The list of available languages
 */
export const setAvailableLanguages = languages => {
  availables = languages

  defaultLanguage = languages[0]
}

/**
 * Gets the avialable languages.
 * @return {string[]}
 */
export const getAvailableLanguages = () => availables

/**
 * Returns the best match language among the available languages
 *
 */
export const getBestLanguage = language => {
  if (language == null) {
    return defaultLanguage
  }

  let select = null

  for (let i = 0; i < availables.length; i++) {
    const available = availables[i]

    const foundPos = language.indexOf(available)

    if (foundPos === 0) {
      if (select == null || select.length < available.length) {
        select = available
      }
    }
  }

  if (select == null) {
    return defaultLanguage
  }

  return select
}
