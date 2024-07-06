class NodeBlock {
  constructor(node) {
    this.node = node;
  }

  #customProps = {};

  // utility to check if node's textContent is only whitespace characters
  is_all_ws(node) {
    if (node.nodeType == 3) {
      return !/[^\t\n\r ]/.test(node.textContent);
    }
  }

  nope() {
    return "No node here.";
  }

  // "nf" is used throughout as a namespace of sorts,
  // it stands for "node-field"

  get nfName() {
    return (this.name = this.node.nodeName);
  }

  get nfType() {
    return (this.type = this.node.nodeType);
  }

  get nfParent() {
    if (this.node.parentNode != null) {
      return (this.parent = this.node.parentNode.nodeName);
    } else {
      return this.nope();
    }
  }

  get nfSibling() {
    if (this.node.nextSibling != null) {
      return (this.sibling = this.node.nextSibling.nodeName);
    } else {
      return this.nope();
    }
  }

  // generate a human-readable version of the nodeType
  label() {
    let label;
    switch (this.nfType) {
      case 1:
        label = "ELEMENT_NODE";
        break;
      case 2:
        label = "ATTRIBUTE_NODE";
        break;
      case 3:
        label = "TEXT_NODE";
        break;
      case 4:
        label = "CDATA_SECTION_NODE";
      case 7:
        // only for XML
        label = "PROCESSING_INSTRUCTION_NODE";
        break;
      case 8:
        label = "COMMENT_NODE";
        break;
      case 9:
        label = "DOCUMENT_NODE";
        break;
      case 10:
        label = "DOCUMENT_TYPE_NODE";
        break;
      case 11:
        label = "DOCUMENT_FRAGMENT_NODE";
        break;
    }
    return label;
  }
  // generate a CSS class name for each nodeType
  style() {
    let style;
    switch (this.node.nodeType) {
      case 1:
        style = "element";
        break;
      case 2:
        style = "attribute";
        break;
      case 3:
        style = "text";
        break;
      case 4:
        style = "cdata";
        break;
      case 7:
        // only for XML
        style = "";
        break;
      case 8:
        style = "comment";
        break;
      case 9:
        style = "document";
        break;
      case 10:
        style = "doctype";
        break;
      case 11:
        style = "fragment";
        break;
    }
    return style;
  }

  printNode() {
    if (!!this.node) {
      let nodeInfoBlock = `
      <div class="entry ${this.style()}">
        <p>name: ${this.nfName}</p>
        <p>type: ${this.nfType} (${this.label()})</p>
        <p>parent: ${this.nfParent}</p>
        <p>sibling: ${this.nfSibling}</p>
      </div>
      `;
      return nodeInfoBlock;
    } else {
      return this.nope();
    }
  }

  placeNode() {
    let host = document.querySelector("#host");
    let output = host.shadowRoot.querySelector("#output");
    output.insertAdjacentHTML("beforeend", this.printNode());
  }
}

// let str = node.textContent;
// let newStr = str
// .replaceAll("\n", "[newline]")
// .replaceAll(" ", "[space]")
// .replaceAll("\t", "[tab]")
// .replaceAll("\r", "[carriage return]");
// if (is_all_ws(node)) {
// displayName = newStr;
// } else {
// displayName = str;
// }
// } else {
// displayName = node.nodeName;
// }

function checkNode(node) {
  if (node.hasChildNodes()) {
    iterateOverChildren(node);
  } else {
    return;
  }
}

function iterateOverChildren(node) {
  let children = node.childNodes;
  for (const child of children) {
    domWalker(child);
  }
}

function domWalker(origin) {
  // `origin` is the starting point for traversing the DOM
  let startNode = new NodeBlock(origin);
  // print the origin node;
  startNode.placeNode();
  // if there are children, walk them
  checkNode(origin);
}
console.log(this.cu);
const start = document;

domWalker(start);
