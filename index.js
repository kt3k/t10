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
  const value = resource[key.trim()]

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

  if (availables.indexOf(language) !== -1) {
    return language
  }

  const candidates = []

  availables.forEach(available => {
    let c = 0

    while (!!available.charAt(c) && available.charAt(c) === language.charAt(c)) c++

    if (c >= 2) {
      if (language.indexOf(available) !== -1) {
        // The available is included in the given language
        // The it gets the bonus point 100
        // Could be wrong approach
        c += 100
      }
      candidates.push({ score: c, language: available })
    }
  })

  if (candidates.length === 0) {
    return defaultLanguage
  }

  candidates.sort((x, y) => -x.score + y.score)

  return candidates[0].language
}
