
var it = window.it;
var describe = window.describe;
var expect = window.expect;

var i18n = window.i18n;

var sinon = window.sinon;

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

        it('calls scanTTag, scanTText and scanTAttr and return aggregated objects of the combination of these methods results', function () {

            var stub1 = sinon.stub(i18n, 'scanTTag');
            var stub2 = sinon.stub(i18n, 'scanTText');
            var stub3 = sinon.stub(i18n, 'scanTAttr');

            stub1.returns(5);
            stub2.returns(11);
            stub3.returns(13);

            var scanResult = i18n.scan();

            expect(scanResult['t-tag']).toBe(5);
            expect(scanResult['t-text']).toBe(11);
            expect(scanResult['t-attr']).toBe(13);

            stub1.restore();
            stub2.restore();
            stub3.restore();
        });

    });


    describe('scanTTag', function () {
    });


    describe('scanTText', function () {
    });


    describe('scanTAttr', function () {
    });


    describe('setAvailableLanguages', function () {
    });


    describe('setLanguage', function () {
    });


    describe('pickUsableLanguage', function () {
    });


    describe('loadScript', function () {
    });


    describe('loadJSON', function () {
    });

});
