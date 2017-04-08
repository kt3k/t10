import * as t10 from './index'
const { expect } = require('chai')

describe('t10', function () {
  describe('setResource', function () {
    it('sets the resource', function () {
      var resource = { abc: 'abc string' }

      t10.setResource(resource)

      expect(t10.getResource()).to.equal(resource)
    })

    it('resets entire resource', function () {
      var resource1 = { abc: 'abc string' }
      var resource2 = { def: 'def string' }

      t10.setResource(resource1)
      t10.setResource(resource2)

      expect(t10.getResource()).to.equal(resource2)
    })
  })

  describe('t', function () {
    it('can translate the existing keys', function () {
      var resource = { abc: 'abc string' }

      t10.setResource(resource)

      expect(t10.t('abc')).to.equal('abc string')
    })

    it('returns the key itself if the corresponding resource doesn\'t exist', function () {
      var resource = { abc: 'abc string' }

      t10.setResource(resource)

      expect(t10.t('nonexistent.key')).to.equal('nonexistent.key')
    })
  })

  describe('scan', function () {
    it('replaces t tag', function () {

    })

    it('replaces .t-text class', function () {

    })

    it('replaces .t-attr class', function () {

    })
  })

  describe('setAvailableLanguages', function () {
    it('sets available languages', function () {
      var availables = ['en', 'fr', 'ja']

      t10.setAvailableLanguages(availables)

      expect(t10.getAvailableLanguages()).to.equal(availables)
    })
  })

  describe('getBestLanguage', function () {
    it('gets the best fit language among the available ones', function () {
      var availables = ['en', 'en-Latn-US', 'en-Latn-UK', 'fr', 'ja', 'ja']

      t10.setAvailableLanguages(availables)

      expect(t10.getBestLanguage('en')).to.equal('en')
      expect(t10.getBestLanguage('en-Latn-UK')).to.equal('en-Latn-UK')
      expect(t10.getBestLanguage('en-Latn-AU')).to.equal('en')
      expect(t10.getBestLanguage('fr')).to.equal('fr')
      expect(t10.getBestLanguage('ja')).to.equal('ja')
      expect(t10.getBestLanguage('ja-Jpan-JP')).to.equal('ja')
      expect(t10.getBestLanguage('de')).to.equal('en') // default language
    })
  })
})
