class NodeBlock {
  constructor(node) {
    this.node = node;
  }

  nope() {
    return "No node here.";
  }

  name() {
    return (this.name = this.node.nodeName);
  }

  type() {
    return (this.type = this.node.nodeType);
  }

  label() {
    let label;
    switch (this.node.nodeType) {
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

  parent() {
    if (this.node.parentNode != null) {
      return (this.parent = this.node.parentNode.nodeName);
    } else {
      return this.nope();
    }
  }

  sibling() {
    if (this.node.nextSibling != null) {
      return (this.sibling = this.node.nextSibling.nodeName);
    } else {
      return this.nope();
    }
  }

  printNode() {
    if (!!this.node) {
      let nodeInfoBlock = `
      <div class="entry ${this.style()}">
        <p>name: ${this.name()}</p>
        <p>type: ${this.type()} (${this.label()})</p>
        <p>parent: ${this.parent()}</p>
        <p>sibling: ${this.sibling()}</p>
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

const nowde = document;
const node1 = new NodeBlock(nowde);
node1.placeNode();

// utility to provide a human-readable label for each nodeType.
function getNodeLabel(node) {
  let nodeLabel;
  let nodeStyle = "plain";
  switch (node.nodeType) {
    case 1:
      nodeLabel = "ELEMENT_NODE";
      nodeStyle = "element";
      break;
    case 2:
      nodeLabel = "ATTRIBUTE_NODE";
      nodeStyle = "attribute";
      break;
    case 3:
      nodeLabel = "TEXT_NODE";
      nodeStyle = "text";
      break;
    case 4:
      nodeLabel = "CDATA_SECTION_NODE";
      nodeStyle = "cdata";
      break;
    case 7:
      // only for XML
      nodeLabel = "PROCESSING_INSTRUCTION_NODE";
      nodeStyle = "processing";
      break;
    case 8:
      nodeLabel = "COMMENT_NODE";
      nodeStyle = "comment";
      break;
    case 9:
      nodeLabel = "DOCUMENT_NODE";
      nodeStyle = "document";
      break;
    case 10:
      nodeLabel = "DOCUMENT_TYPE_NODE";
      nodeStyle = "doctype";
      break;
    case 11:
      nodeLabel = "DOCUMENT_FRAGMENT_NODE";
      nodeStyle = "fragment";
      break;
  }
  return nodeLabel;
}

// utility to check if node's textContent is only whitespace characters
function is_all_ws(node) {
  if (node.nodeType == 3) {
    return !/[^\t\n\r ]/.test(node.textContent);
  }
}

function placeNode(block) {
  let host = document.querySelector("#host");
  let output = host.shadowRoot.querySelector("#output");
  // let newEntry = document.createElement("div");
  // let entryText = document.createTextNode(text);
  // newEntry.append(entryText);
  output.insertAdjacentHTML("beforeend", block);
}

// Print the name and various properties of the node.
function printNode(node) {
  //
  let label = getNodeLabel(node);
  let name = node.nodeName;
  let parent = `${node.parentNode != null ? node.parentNode.nodeName : "none"}`;
  let sibling = `${
    node.nextSibling != null ? node.nextSibling.nodeName : "no sibling"
  }`;
  // Format the output according to Node.nodeType
  let style;
  if (node.nodeType == 1) {
    style = "element";
  } else if (node.nodeType == 3) {
    style = "text";
  } else if (node.nodeType == 8) {
    style = "comment";
  } else if (node.nodeType == 9) {
    style = "document";
  } else if (node.nodeType == 10) {
    style = "doctype";
  } else {
    style = "undefined";
  }
  let nodeInfoBlock = `
    <div class="entry ${style}">
      <p>${name} (${label})</p>
      <p>${parent} | ${sibling}</p>
    </div>
  `;

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
  placeNode(nodeInfoBlock);
}

function relations(node) {
  let desc;
  let sibl;
  let tc;
  if (node.hasChildNodes()) {
    desc = "yes";
  } else {
    desc = "no";
  }
  if (node.nextSibling != null) {
    sibl = "yes";
  } else {
    sibl = "no";
  }
  if (is_all_ws(node)) {
    tc = "ws";
  } else {
    tc = `"${node.textContent}"`;
  }

  let parent = `${node.parentNode != null ? node.parentNode.nodeName : "none"}`;
  let siblName = `${
    node.nextSibling != null ? node.nextSibling.nodeName : "end"
  }`;
  return console.log(
    `${node.nodeName}(${getNodeLabel(
      node
    )})(parent: ${parent}) | has children: ${desc} | has sibling: ${sibl} (${siblName}) ${
      node.nodeType == 3 ? tc : ""
    }`
  );
}

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
  // print the origin node;
  printNode(origin);
  // if there are children, walk them
  checkNode(origin);
}

const start = document;

// domWalker(start);
// let model = document.querySelector("#model");
// console.log(model.getAttribute("id"));
