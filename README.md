i18n.js
=======

translation for browser


Usage
-----

set translation resource:

```javascript
i18n.setResource({
  str_id: 'translated str_id'
});
```

perform translation on the document:

```javascript
i18n.scan();
```


### `<t>` tag

```html
...<t>str_id</t>...
```
translated into:

```html
...translated str_id...
```


### `.t-text` class

```html
<span class="t-text">str_id</span>
```

translated into:

```html
<span class="t-text-done">translated str_id</span>
```


### `.t-attr` class

```html
<input type="text" class="t-attr" placeholder="t:str_id" />
```

translated into:

```html
<input type="text" class="t-attr-done" placeholder="translated str_id" />
```

DPENDENCY
---------

- jQuery

LICENSE
-------

MIT License (Yoshiya Hinosawa)
