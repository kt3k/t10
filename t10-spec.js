
/* global describe, it, expect, t10 */

describe('t10', function () {
    'use strict';

    it('exists', function () {

        expect(t10).to.not.equal(null);

    });

    describe('setResource', function () {

        it('sets the resource', function () {

            var resource = {abc: 'abc string'};

            t10.setResource(resource);

            expect(t10.getResource()).to.equal(resource);
        });

        it('resets entire resource', function () {

            var resource1 = {abc: 'abc string'};
            var resource2 = {def: 'def string'};

            t10.setResource(resource1);
            t10.setResource(resource2);

            expect(t10.getResource()).to.equal(resource2);
        });
    });

    describe('t', function () {

        it('can translate the existing keys', function () {
            var resource = {abc: 'abc string'};

            t10.setResource(resource);

            expect(t10.t('abc')).to.equal('abc string');
        });

        it('returns the key itself if the corresponding resource doesn\'t exist', function () {
            var resource = {abc: 'abc string'};

            t10.setResource(resource);

            expect(t10.t('nonexistent.key')).to.equal('nonexistent.key');
        });

    });

    describe('scan', function () {
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


});
