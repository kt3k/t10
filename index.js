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
 *
 * @param {Object} resource The mapping from key to translated string
 * @return {t10} The t10 object itself
 */
export const setResource = newResource => { resource = newResource }

export const getResource = () => resource

/**
 * Translates a key
 *
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
 * @return object
 * @subreturn {Number} object['t-tag'] the count of translated <t> tags
 * @subreturn {Number} object['t-text'] the count of translated .t-text tags
 * @subreturn {Number} object['t-attr'] the count of translated .t-attr tags' attributes
 */
export const scan = dom => ({
  't-tag': scanTTag(dom),
  't-text': scanTText(dom),
  't-attr': scanTAttr(dom)
})

/**
 * remove <t> tag and insert string for key
 *
 * @param {HTMLElement} dom
 * @return translated key count
 */
export const scanTTag = dom => {
  return [].map.call(dom.querySelectorAll('t'), el => {
    el.parentElement.insertBefore(new Text(t(el.textContent)), el)
    el.parentElement.removeChild(el)
  }).length
}

/**
 * scan .t-text class and replace text with translated string
 *
 * @return translated key count
 */
export const scanTText = dom => {
  let count = 0

  ;[].forEach.call(dom.querySelectorAll('.t-text'), function (el) {
    // replace text with translated string
    el.textContent = t(elm.text())

    el.classList.remove('t-text')
    el.classList.add('t-text-done')

    // increment translation count
    count++
  })

  return count
}

const T_ATTR_REGEXP = /^t:/ // translatable attribute starts with 't:'

/**
 * scan .t-attr class and translate its attr starts with 't:' prefix
 *
 * @return translated key count
 */
export const scanTAttr = dom => {
  let count = 0

  ;[].forEach.call(dom.querySelectorAll('.t-attr'), el => {
    ;[].forEach.call(el.attributes, (i, attr) => {
      let label = attr.value

      if (T_ATTR_REGEXP.test(label)) {
        label = label.replace(T_ATTR_REGEXP, '')

        // replace attribute value with translated string
        attr.value = t(label)

        // increment translation count
        count++
      }
    })

    el.classList.remove('t-attr')
    el.classList.add('t-attr-done')
  })

  return count
}

export const setAvailableLanguages = array => {
  availables = array

  defaultLanguage = array[0]
}

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