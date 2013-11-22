
var it = window.it;
var describe = window.describe;
var expect = window.expect;

var i18n = window.i18n;

describe('i18n', function () {
    'use strict';

    it('exists', function () {

        expect(i18n).not.toEqual(null);

    });

    describe('setResource', function () {

        it('sets the resource', function () {

            var resource = {abc: 'abc string'};

            i18n.setResource(resource);

            expect(i18n.resource).toBe(resource);
        });

        it('resets entire resource', function () {

            var resource1 = {abc: 'abc string'};
            var resource2 = {def: 'def string'};

            i18n.setResource(resource1);
            i18n.setResource(resource2);

            expect(i18n.resource).toBe(resource2);
        });
    });

    describe('t', function () {

        it('can translate the existing keys', function () {
            var resource = {abc: 'abc string'};

            i18n.setResource(resource);

            expect(i18n.t('abc')).toBe('abc string');
        });

        it('returns the key itself if the corresponding resource doesn\'t exist', function () {
            var resource = {abc: 'abc string'};

            i18n.setResource(resource);

            expect(i18n.t('nonexistent.key')).toBe('nonexistent.key');
        });

    });

    describe('scan', function () {
    });

});
