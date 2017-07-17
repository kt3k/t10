# t10 v1.0.1

> Translation for browser

[![CircleCI](https://circleci.com/gh/kt3k/t10.svg?style=svg)](https://circleci.com/gh/kt3k/t10)
[![codecov](https://codecov.io/gh/kt3k/t10/branch/master/graph/badge.svg)](https://codecov.io/gh/kt3k/t10)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

First, load the [script](https://unpkg.com/t10/dist/t10.js):
```html
<script type="text/javascript" src="path/to/t10.js"></script>
```

Second, set the translation resource:

```javascript
t10.setResource({
  id_foo: 'Translated foo!',
  id_bar: 'Translated bar!',
  id_baz: 'Translated baz!'
});
```

Finally, perform the translation:

```javascript
t10.scan();
```

That's it. This performs the translation on the entire page synchronously.

With the above call the following html:

```html
<p>
  <t>id_foo</t>
  <span class="t-text-done">id_bar</span>
  <input class="t-attr-done" placeholder="t:id_baz" />
</p>
```

Changes in to:

```html
<p>
  Translated foo!
  <span class="t-text">Translated bar!</span>
  <input class="t-attr" placeholder="Translated baz!" />
</p>
```

---

Alternatively you can use via npm.

First install t10 locally:

    npm i t10

Then require / import it and use it:

```js
const t10 = require('t10');
```

or:

```js
import * as t10 from require('t10');
```

The rest is the same.


## What *t10.scan()* translates

### *t* tag

```html
...<t>str_id</t>...
```
translated into:

```html
...translated str_id...
```


### *.t-text* class

```html
<span class="t-text">str_id</span>
```

translated into:

```html
<span class="t-text-done">translated str_id</span>
```


### *.t-attr* class

```html
<input type="text" class="t-attr" placeholder="t:str_id" />
```

translated into:

```html
<input type="text" class="t-attr-done" placeholder="translated str_id" />
```

# Hide untranslated elements

You can hide untranslated elements by the following style:

```css
t, .t-text, .t-attr {
    visibility: hidden;
}
```

**Note**: `t` tag and `.t-text`, `.t-attr` classes are going to be removed after the translation.

# Select the best fit language from available list

### Basic Usage

```javascript
t10.setAvailables(['en', 'fr', 'ja']).getBestLanguage('ja'); // => 'ja'
t10.setAvailables(['en', 'fr', 'ja']).getBestLanuuage('de'); // => 'en' # the first available is the default
t10.setAvailables(['en', 'fr', 'ja']).getBestLanguage('en.US'); // => 'en'
t10.setAvailables(['en', 'fr', 'ja']).getBestLanguage('ja.JP'); // => 'ja'
```

### Typical Usage

```javascript
var language = t10.setAvailables(['en', 'fr', 'ja']).getBestLanguage(getFromSystem());

$.getScript('path/to/resource/' + language + '.js').then(function () {
    t10.scan();
});
```

# Translate

`t` function translates a single key.

```
t10.setResource({pen: 'ペン'});

t10.t('pen'); // => ペン
```

# Dependency

- None

# License

MIT License (Yoshiya Hinosawa)
