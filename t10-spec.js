
var it = window.it;
var describe = window.describe;
var expect = window.expect;

var t10 = window.t10;

var sinon = window.sinon;

describe('t10', function () {
    'use strict';

    it('exists', function () {

        expect(t10).not.toEqual(null);

    });

    describe('setResource', function () {

        it('sets the resource', function () {

            var resource = {abc: 'abc string'};

            t10.setResource(resource);

            expect(t10.resource).toBe(resource);
        });

        it('resets entire resource', function () {

            var resource1 = {abc: 'abc string'};
            var resource2 = {def: 'def string'};

            t10.setResource(resource1);
            t10.setResource(resource2);

            expect(t10.resource).toBe(resource2);
        });
    });

    describe('t', function () {

        it('can translate the existing keys', function () {
            var resource = {abc: 'abc string'};

            t10.setResource(resource);

            expect(t10.t('abc')).toBe('abc string');
        });

        it('returns the key itself if the corresponding resource doesn\'t exist', function () {
            var resource = {abc: 'abc string'};

            t10.setResource(resource);

            expect(t10.t('nonexistent.key')).toBe('nonexistent.key');
        });

    });

    describe('scan', function () {

        it('calls scanTTag, scanTText and scanTAttr and return aggregated objects of the combination of these methods results', function () {

            var stub1 = sinon.stub(t10, 'scanTTag');
            var stub2 = sinon.stub(t10, 'scanTText');
            var stub3 = sinon.stub(t10, 'scanTAttr');

            stub1.returns(5);
            stub2.returns(11);
            stub3.returns(13);

            var scanResult = t10.scan();

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
