
/**
 * @class t10
 * @singleton
 *
 * t10 class provides basic translation functionalities in Browsers.
 */
window.t10 = (function (window) {
    'use strict';

    var $ = window.jQuery;

    var exports = function () {};

    var self = new exports();

    var t10Pt = exports.prototype;

    /**
     * Set the translation resource
     *
     * @param {Object} resource The mapping from key to translated string
     * @return {t10} The t10 object itself
     */
    t10Pt.setResource = function (resource) {
        self.resource = resource;

        return self;
    };

    /**
     * Translate a key
     *
     * @param {String} key The key to translate
     * @return {String} The translated string
     */
    t10Pt.t = function (key) {
        var value = self.resource[key];

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
    t10Pt.scan = function (dom) {
        var t = self.scanTTag(dom);
        var tText = self.scanTText(dom);
        var tAttr = self.scanTAttr(dom);

        return {
            't-tag': t,
            't-text': tText,
            't-attr': tAttr
        };
    };

    /**
     * remove <t> tag and insert string for key
     *
     * @return translated key count
     */
    t10Pt.scanTTag = function (dom) {

        var list = $('t', dom).each(function () {

            var t = $(this);

            t.after(self.t(t.text())).remove();

        });

        return list.length;

    };

    /**
     * scan .t-text class and replace text with translated string
     *
     * @return translated key count
     */
    t10Pt.scanTText = function (dom) {

        var count = 0;

        $('.t-text', dom).each(function () {

            var elm = $(this);

            // replace text with translated string
            elm.text(self.t(elm.text()));

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
    t10Pt.scanTAttr = function (dom) {

        var count = 0;

        $('.t-attr', dom).each(function () {

            $.each(this.attributes, function (i, attr) {
                var label = attr.value;

                if (T_ATTR_REGEXP.test(label)) {
                    label = label.replace(T_ATTR_REGEXP, '');

                    // replace attribute value with translated string
                    attr.value = self.t(label);

                    // increment translation count
                    count ++;
                }

            });

            $(this).removeClass('t-attr').addClass('t-attr-done');

        });

        return count;
    };

    t10Pt.setAvailableLanguages = function (array) {
        self.availables = array;

        self.defaultLanguage = array[0];
    };

    t10Pt.setLanguage = function (language) {
        self.language = language;
    };

    t10Pt.pickUsableLanguage = function (language) {
        language = language || self.language;

        if (language == null) {
            return self.defaultLanguage;
        }

        var select = null;

        for (var i = 0; i < self.availables.length; i++) {
            var available = self.availables[i];

            var foundPos = language.indexOf(available);

            if (foundPos === 0) {
                if (select == null || select.length < available.length) {
                    select = available;
                }
            }
        }

        if (select == null) {
            return self.defaultLanguage;
        }

        return select;

    };

    t10Pt.loadScript = function (urlPattern) {
        return $.getScript(urlPattern.replace('{LANGUAGE}', self.pickUsableLanguage()));
    };

    t10Pt.loadJson = function (urlPattern) {
        return $.getJSON(urlPattern.replace('{LANGUAGE}', self.pickUsableLanguage())).pipe(function (resource) {
            self.setResources(resource);
        });
    };

    return new exports();

}(window));
