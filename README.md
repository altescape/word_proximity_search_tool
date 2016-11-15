# Word proximity search tool
Searches for words in documents that are close to each other

`word1 *3 word2`

would return the results for 'word1' where it is 3 words away or less from 'word2'. If * was the desired proximity operator.

### Implemented so far

#### Highlighter

This highlights the two words on a page

```JavaScript
const myHightlighter = new Highlighter();
myHightlighter.apply("post organic");
```

### Todo

* retrieve text and remove tags - so it is simpler to find proximity.
* implement as a Chrome plugin
