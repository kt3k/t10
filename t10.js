
/**
 * @class t10
 * @singleton
 *
 * t10 class provides basic translation functionalities in Browsers.
 */
window.t10 = (function (window, $) {
    'use strict';

    var exports = {};

    var resource = {};

    var availables = [];

    var defaultLanguage = null;

    /**
     * Sets the translation resource
     *
     * @param {Object} resource The mapping from key to translated string
     * @return {t10} The t10 object itself
     */
    exports.setResource = function (newResource) {
        resource = newResource;

        return exports;
    };

    exports.getResource = function () {
        return resource;
    };

    /**
     * Translates a key
     *
     * @param {String} key The key to translate
     * @return {String} The translated string
     */
    exports.t = function (key) {
        var value = resource[key];

        if (value != null) {
            return value;
        }

        return key;
    };

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
        };

    };

    /**
     * remove <t> tag and insert string for key
     *
     * @return translated key count
     */
    exports.scanTTag = function (dom) {

        var list = $('t', dom).each(function () {

            var elm = $(this);

            elm.after(exports.t(elm.text())).remove();

        });

        return list.length;

    };

    /**
     * scan .t-text class and replace text with translated string
     *
     * @return translated key count
     */
    exports.scanTText = function (dom) {

        var count = 0;

        $('.t-text', dom).each(function () {

            var elm = $(this);

            // replace text with translated string
            elm.text(exports.t(elm.text()));

            elm.removeClass('t-text').addClass('t-text-done');

            // increment translation count
            count ++;
        });

        return count;
    };

    var T_ATTR_REGEXP = /^t:/; // translatable attribute starts with 't:'

    /**
     * scan .t-attr class and translate its attr starts with 't:' prefix
     *
     * @return translated key count
     */
    exports.scanTAttr = function (dom) {

        var count = 0;

        $('.t-attr', dom).each(function () {

            $.each(this.attributes, function (i, attr) {
                var label = attr.value;

                if (T_ATTR_REGEXP.test(label)) {
                    label = label.replace(T_ATTR_REGEXP, '');

                    // replace attribute value with translated string
                    attr.value = exports.t(label);

                    // increment translation count
                    count ++;
                }

            });

            $(this).removeClass('t-attr').addClass('t-attr-done');

        });

        return count;
    };


    exports.setAvailableLanguages = function (array) {

        availables = array;

        defaultLanguage = array[0];

        return exports;

    };

    exports.getAvailableLanguages = function () {

        return availables;

    };


    /**
     * Returns the best match language among the available languages
     *
     */
    exports.getBestLanguage = function (language) {

        if (language == null) {
            return defaultLanguage;
        }

        var select = null;

        for (var i = 0; i < availables.length; i++) {
            var available = availables[i];

            var foundPos = language.indexOf(available);

            if (foundPos === 0) {
                if (select == null || select.length < available.length) {
                    select = available;
                }
            }
        }

        if (select == null) {
            return defaultLanguage;
        }

        return select;

    };


    return exports;

}(window, window.jQuery));
