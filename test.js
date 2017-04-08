import * as t10 from './index'
const chai = require('chai')
const { expect } = chai
const dirtyChai = require('dirty-chai')
import { u } from 'umbrellajs'

chai.use(dirtyChai)

describe('t10', () => {
  beforeEach(() => {
    t10.setResource({
      abc: 'abc string'
    })

    u('body').html('')
  })

  afterEach(() => {
    t10.clearResource()
  })

  describe('setResource', () => {
    it('sets the resource', () => {
      const resource = { foo: 'hello' }

      t10.setResource(resource)

      expect(t10.getResource()).to.equal(resource)
    })

    it('resets entire resource', () => {
      const resource1 = { abc: 'abc string' }
      const resource2 = { def: 'def string' }

      t10.setResource(resource1)
      t10.setResource(resource2)

      expect(t10.getResource()).to.equal(resource2)
    })
  })

  describe('t', () => {
    it('can translate the existing keys', () => {
      expect(t10.t('abc')).to.equal('abc string')
    })

    it('returns the key itself if the corresponding resource doesn\'t exist', () => {
      expect(t10.t('nonexistent.key')).to.equal('nonexistent.key')
    })
  })

  describe('scan', () => {
    it('replaces t tag', () => {
      u('body').append('<t>abc</t>')

      t10.scan()

      expect(document.body.textContent).to.equal('abc string')
      expect(document.body.querySelector('t')).to.be.null()
    })

    it('replaces .t-text class', () => {
      u('body').append('<span class="t-text">abc</span>')

      t10.scan()

      expect(document.body.textContent).to.equal('abc string')
      expect(document.body.querySelector('.t-text')).to.be.null()
      expect(document.body.querySelector('.t-text-done')).to.not.be.null()
    })

    it('replaces .t-attr class', () => {
      u('body').append('<input class="t-attr" value="t:abc" />')

      t10.scan()

      expect(document.body.querySelector('input').getAttribute('value')).to.equal('abc string')
      expect(document.body.querySelector('.t-attr')).to.be.null()
      expect(document.body.querySelector('.t-attr-done')).to.not.be.null()
    })
  })

  describe('setAvailableLanguages', () => {
    it('sets available languages', () => {
      var availables = ['en', 'fr', 'ja']

      t10.setAvailableLanguages(availables)

      expect(t10.getAvailableLanguages()).to.equal(availables)
    })
  })

  describe('getBestLanguage', () => {
    it('gets the best fit language among the available ones', () => {
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
