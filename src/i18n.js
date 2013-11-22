
window.i18n = (function (window) {
    'use strict';

    var $ = window.jQuery;

    var exports = function () {};

    var i18nPt = exports.prototype;

    /**
     * Set the translation resource
     * @param {object} resource to set
     */
    i18nPt.setResource = function (resource) {
        this.resource = resource;
    };

    /**
     * Translate a key
     * @param {string} key to translate
     */
    i18nPt.t = function (key) {
        var value = this.resource[key];

        if (value != null) {
            return value;
        }

        return key;
    };

    /**
     * Scan <t> tags and .t-text and .t-attr class elements and translate its contents
     * @return object
     * @subreturn {number} object['t-tag'] the count of translated <t> tags
     * @subreturn {number} object['t-text'] the count of translated .t-text tags
     * @subreturn {number} object['t-attr'] the count of translated .t-attr tags' attributes
     */
    i18nPt.scan = function (dom) {
        var t = this.scanTTag(dom);
        var tText = this.scanTText(dom);
        var tAttr = this.scanTAttr(dom);

        return {
            't-tag': t,
            't-text': tText,
            't-attr': tAttr
        };
    };

    /**
     * remove <t> tag and insert string for key
     * @return translated key count
     */
    i18nPt.scanTTag = function (dom) {

        var self = this;

        var list = $('t', dom).each(function () {

            var t = $(this);

            t.after(self.t(t.text())).remove();

        });

        return list.length;

    };

    /**
     * scan .t-text class and replace text with translated string
     * @return translated key count
     */
    i18nPt.scanTText = function (dom) {

        var self = this;

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
     * @return translated key count
     */
    i18nPt.scanTAttr = function (dom) {

        var self = this;

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

    i18nPt.setAvailableLanguages = function (array) {
        this.availables = array;

        this.defaultLanguage = array[0];
    };

    i18nPt.setLanguage = function (language) {
        this.language = language;
    };

    i18nPt.pickUsableLanguage = function (language) {
        language = language || this.language;

        if (language == null) {
            return this.defaultLanguage;
        }

        var select = null;

        for (var i = 0; i < this.availables.length; i++) {
            var available = this.availables[i];

            var foundPos = language.indexOf(available);

            if (foundPos === 0) {
                if (select == null || select.length < available.length) {
                    select = available;
                }
            }
        }

        if (select == null) {
            return this.defaultLanguage;
        }

        return select;

    };

    i18nPt.loadScript = function (urlPattern) {
        return $.getScript(urlPattern.replace('{LANGUAGE}', this.pickUsableLanguage()));
    };

    i18nPt.loadJson = function (urlPattern) {
        return $.getJSON(urlPattern.replace('{LANGUAGE}', this.pickUsableLanguage())).pipe(function (resource) {
            this.setResources(resource);
        });
    };

    return new exports();

}(window));
