const t10 = require('./index')
const chai = require('chai')
const { expect } = chai
const dirtyChai = require('dirty-chai')
const { u } = require('umbrellajs')

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
    it('replaces t tag with translated text', () => {
      u('body').append('<t>abc</t>')

      t10.scan()

      expect(document.body.textContent).to.equal('abc string')
      expect(document.body.querySelector('t')).to.be.null()
    })

    it('replaces in the given range', () => {
      u('body').append('<div><t>abc</t></div><p><t>abc<t></p>')

      t10.scan(document.querySelector('div'))

      expect(document.querySelector('div').textContent).to.equal('abc string')
      expect(document.querySelector('p').textContent).to.equal('abc')
    })

    it('replaces .t-text class textContent with translated text', () => {
      u('body').append('<span class="t-text">abc</span>')

      t10.scan()

      expect(document.body.textContent).to.equal('abc string')
      expect(document.body.querySelector('.t-text')).to.be.null()
      expect(document.body.querySelector('.t-text-done')).to.not.be.null()
    })

    it('ignores the leading and trailing whitespaces when looking up strings', () => {
      u('body').append('<span class="t-text"> abc\n</span>')

      t10.scan()

      expect(document.body.textContent).to.equal('abc string')
    })

    it('replaces .t-attr class attribtues with translated text', () => {
      u('body').append('<input class="t-attr" value="t:abc" />')

      t10.scan()

      expect(document.body.querySelector('input').getAttribute('value')).to.equal('abc string')
      expect(document.body.querySelector('.t-attr')).to.be.null()
      expect(document.body.querySelector('.t-attr-done')).to.not.be.null()
    })
  })

  describe('setAvailableLanguages', () => {
    it('sets available languages', () => {
      const availables = ['en', 'fr', 'ja']

      t10.setAvailableLanguages(availables)

      expect(t10.getAvailableLanguages()).to.equal(availables)
    })
  })

  describe('getBestLanguage', () => {
    it('gets the best fit language among the available ones', () => {
      const availables = ['en-Latn-US', 'en', 'en-Latn-UK', 'fr', 'ja']

      t10.setAvailableLanguages(availables)

      expect(t10.getBestLanguage('en')).to.equal('en')
      expect(t10.getBestLanguage('en-Latn-US')).to.equal('en-Latn-US')
      expect(t10.getBestLanguage('en-Latn-UK')).to.equal('en-Latn-UK')
      expect(t10.getBestLanguage('en-Latn-AU')).to.equal('en')
      expect(t10.getBestLanguage('fr')).to.equal('fr')
      expect(t10.getBestLanguage('ja')).to.equal('ja')
      expect(t10.getBestLanguage('ja-Jpan-JP')).to.equal('ja')
      expect(t10.getBestLanguage('de')).to.equal('en-Latn-US') // default language
      expect(t10.getBestLanguage()).to.equal('en-Latn-US') // default language
    })
  })
})
