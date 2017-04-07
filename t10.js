
/**
 * t10 class provides basic translation functionalities in Browsers.
 */
window.t10 = (function (window) {
  const exports = {}

  let resource = {}

  let availables = []

  let defaultLanguage = null

  /**
   * Sets the translation resource
   *
   * @param {Object} resource The mapping from key to translated string
   * @return {t10} The t10 object itself
   */
  exports.setResource = function (newResource) {
    resource = newResource

    return exports
  }

  exports.getResource = function () {
    return resource
  }

  /**
   * Translates a key
   *
   * @param {String} key The key to translate
   * @return {String} The translated string
   */
  exports.t = function (key) {
    const value = resource[key]

    if (value != null) {
      return value
    }

    return key
  }

  /**
   * Scan <t> tags and .t-text and .t-attr class elements and translate its contents
   *
   * @return object
   * @subreturn {Number} object['t-tag'] the count of translated <t> tags
   * @subreturn {Number} object['t-text'] the count of translated .t-text tags
   * @subreturn {Number} object['t-attr'] the count of translated .t-attr tags' attributes
   */
  exports.scan = function (dom) {
    return {
      't-tag': exports.scanTTag(dom),
      't-text': exports.scanTText(dom),
      't-attr': exports.scanTAttr(dom)
    }
  }

  /**
   * remove <t> tag and insert string for key
   *
   * @param {HTMLElement} dom
   * @return translated key count
   */
  exports.scanTTag = function (dom) {
    return [].map.call(dom.querySelectorAll('t'), el => {
      el.parentElement.insertBefore(new Text(exports.t(el.textContent)), el)
      el.parentElement.removeChild(el)
    }).length
  }

  /**
   * scan .t-text class and replace text with translated string
   *
   * @return translated key count
   */
  exports.scanTText = function (dom) {
    const count = 0

    ;[].forEach.call(dom.querySelectorAll('.t-text'), function (el) {
      // replace text with translated string
      el.textContent = exports.t(elm.text())

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
  exports.scanTAttr = function (dom) {
    let count = 0

    ;[].forEach.call(dom.querySelectorAll('.t-attr'), el => {
      ;[].forEach.call(el.attributes, (i, attr) => {
        let label = attr.value

        if (T_ATTR_REGEXP.test(label)) {
          label = label.replace(T_ATTR_REGEXP, '')

          // replace attribute value with translated string
          attr.value = exports.t(label)

          // increment translation count
          count++
        }
      })

      el.classList.remove('t-attr')
      el.classList.add('t-attr-done')
    })

    return count
  }

  exports.setAvailableLanguages = function (array) {
    availables = array

    defaultLanguage = array[0]

    return exports
  }

  exports.getAvailableLanguages = function () {
    return availables
  }

  /**
   * Returns the best match language among the available languages
   *
   */
  exports.getBestLanguage = function (language) {
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

  return exports
}(window))
