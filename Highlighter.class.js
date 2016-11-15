class Highlighter {
  constructor(id, tag) {
    this.id = id;
    this.tag = tag;
    this.targetNode = document.getElementById(this.id) || document.body;
    this.highlightTag = this.tag || "EM";
    this.skipTags = new RegExp(`^(?:${this.highlightTag}|SCRIPT|FORM|SPAN)$`);
    this.colors = ["#ff6", "#a0ffff", "#9f9", "#f99", "#f6f"];
    this.wordColor = [];
    this.colorIdx = 0;
    this.matchRegex;
    this.regs;
    this.matchedText = [];
  }

  setRegex(input) {
    input = input.replace(/^[^\w]+|[^\w]+$/g, "").replace(/[^\w'-]+/g, "|").replace(/^\||\|$/g, "");
    if (input === undefined) return false;

    this.matchRegex = new RegExp(`(${input})`, "i");
    return true;
  }

  highlightWords(node) {
    if(node === undefined || !node) return;
    if(!this.matchRegex) return;
    if(this.skipTags.test(node.nodeName)) return;

    if(node.hasChildNodes()) {
      for(let i=0; i < node.childNodes.length; i++)
        this.highlightWords(node.childNodes[i]);
    }

   if(node.nodeType === 3) {
      this.matchedText = this.matchRegex.exec(node.nodeValue);
      if(this.matchedText !== null) {
        this.regs = this.matchRegex.exec(node.nodeValue);

        if(!this.wordColor[this.regs[0].toLowerCase()])
          this.wordColor[this.regs[0].toLowerCase()] = this.colors[this.colorIdx++ % this.colors.length];

        this.createHighlightElement(node);
      }
    }
  }

  createHighlightElement(node, text) {
    const match = document.createElement(this.highlightTag);
    match.appendChild(document.createTextNode(this.regs[0]));
    match.style.backgroundColor = this.wordColor[this.regs[0].toLowerCase()];
    match.className = this.matchedText[0];
    match.style.fontStyle = 'inherit';
    match.style.color = '#000';
    const after = node.splitText(this.regs.index);
    after.nodeValue = after.nodeValue.substring(this.regs[0].length);
    node.parentNode.insertBefore(match, after);
    // console.log(match.getBoundingClientRect());
  }

  remove() {
    const arr = document.getElementsByTagName(this.highlightTag);
    let el = [];
    while(arr.length && (el = arr[0])) {
      const parent = el.parentNode;
      parent.replaceChild(el.firstChild, el).normalize();
    }
  }

  apply(input) {
    this.remove();
    if(input === undefined || !input) return;
    if(this.setRegex(input))
      this.highlightWords(this.targetNode);
  }
}
