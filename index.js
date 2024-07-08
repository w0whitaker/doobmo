class NodeBlock {
  constructor(name, type, parent, sibling, label, style) {
    this.name = name;
    this.type = type;
    this.parent = parent;
    this.sibling = sibling;
    this.label = label;
    this.style = style;
  }

  printNode() {
    let host = document.querySelector("#host");
    let output = host.shadowRoot.querySelector("#output");
    let block = `
    <div class="entry ${this.style}">
      <p>${this.name}</p>
      <p>${this.type} (${this.label})</p>
      <p>parent node: ${this.parent}</p>
      <p>sibling node: ${this.sibling}</p>
    </div>
    `;
    return output.insertAdjacentHTML("beforeend", block);
  }
}

const nodeProperties = {};
function setProps(node) {
  nodeProperties.ndName = node.nodeName;
  nodeProperties.ndType = node.nodeType;
  nodeProperties.ndParent = node.parentNode ? node.parentNode.nodeName : "none";
  nodeProperties.ndSibling = node.nextSibling
    ? node.nextSibling.nodeName
    : "none";
  switch (node.nodeType) {
    case 1:
      nodeProperties.ndLabel = "ELEMENT_NODE";
      nodeProperties.ndStyle = "element";
      break;
    case 2:
      nodeProperties.ndLabel = "ATTRIBUTE_NODE";
      nodeProperties.ndStyle = "attribute";
      break;
    case 3:
      nodeProperties.ndLabel = "TEXT_NODE";
      nodeProperties.ndStyle = "text";
      break;
    case 4:
      nodeProperties.ndLabel = "CDATA_SECTION_NODE";
      nodeProperties.ndStyle = "cdata";
      break;
    case 7:
      // only for XML
      nodeProperties.ndLabel = "PROCESSING_INSTRUCTION_NODE";
      nodeProperties.ndStyle = "processing";
      break;
    case 8:
      nodeProperties.ndLabel = "COMMENT_NODE";
      nodeProperties.ndStyle = "comment";
      break;
    case 9:
      nodeProperties.ndLabel = "DOCUMENT_NODE";
      nodeProperties.ndStyle = "document";
      break;
    case 10:
      nodeProperties.ndLabel = "DOCUMENT_TYPE_NODE";
      nodeProperties.ndStyle = "doctype";
      break;
    case 11:
      nodeProperties.ndLabel = "DOCUMENT_FRAGMENT_NODE";
      nodeProperties.ndStyle = "fragment";
      break;
  }
}

// while (treewalker.nextNode()) {
//   makeBlock(treewalker.currentNode);
// }
//   console.log(treewalker.currentNode.nodeProperties);
//   const block = new NodeBlock(
//     treewalker.currentNode.nodeName,
//     treewalker.currentNode.nodeType,
//     treewalker.currentNode.parentNode,
//     treewalker.currentNode.nextSibling,
//     treewalker.currentNode.nodeProperties
//     // nodeProperties.nodeStyle
//   );
//   block.printNode();
// }

// utility to check if node's textContent is only whitespace characters
// function is_all_ws(node) {
//   if (node.nodeType == 3) {
//     return !/[^\t\n\r ]/.test(node.textContent);
//   }
// };

// function nope() {
//     return "No node here.";
// }

// const nodeProperties = {};

// const setProperties = (node) => {
//   switch (node.nodeType) {
//     case 1:
//       nodeProperties.name = node.nodeName;
//       nodeProperties.type = node.nodeType;
//       nodeProperties.parent = node.parentNo
//       nodeProperties.sibling
//       nodeProperties.label = "ELEMENT_NODE";
//       nodeProperties.style = "element";
//       break;
//   }
// };

// const node = document.querySelector("article");
// setProperties(node);
// console.log(nodeProperties.label);
// console.log(nodeProperties.style);

//   switch (node?) {
//     case 1:
//       nodeProperties.label = "ELEMENT_NODE";
//       break;
//     case 2:
//       nodeProperties.label = "ATTRIBUTE_NODE";
//       break;
//     case 3:
//       nodeProperties.label = "TEXT_NODE";
//       break;
//     case 4:
//       nodeProperties.label = "CDATA_SECTION_NODE";
//     case 7:
//       // only for XML
//       nodeProperties.label = "PROCESSING_INSTRUCTION_NODE";
//       break;
//     case 8:
//       nodeProperties.label = "COMMENT_NODE";
//       break;
//     case 9:
//       nodeProperties.label = "DOCUMENT_NODE";
//       break;
//     case 10:
//       nodeProperties.label = "DOCUMENT_TYPE_NODE";
//       break;
//     case 11:
//       nodeProperties.label = "DOCUMENT_FRAGMENT_NODE";
//       break;
//   }
//   return label;
// }
// generate a CSS class name for each nodeType
// style() {
//   let style;
//   switch (this.node.nodeType) {
//     case 1:
//       style = "element";
//       break;
//     case 2:
//       style = "attribute";
//       break;
//     case 3:
//       style = "text";
//       break;
//     case 4:
//       style = "cdata";
//       break;
//     case 7:
//       // only for XML
//       style = "";
//       break;
//     case 8:
//       style = "comment";
//       break;
//     case 9:
//       style = "document";
//       break;
//     case 10:
//       style = "doctype";
//       break;
//     case 11:
//       style = "fragment";
//       break;
//   }
//   return style;
// }

// printNode() {
//   if (!!this.node) {
//     let nodeInfoBlock = `
//     <div class="entry ${this.style()}">
//       <p>name: ${this.nfName}</p>
//       <p>type: ${this.nfType} (${this.label()})</p>
//       <p>parent: ${this.nfParent}</p>
//       <p>sibling: ${this.nfSibling}</p>
//     </div>
//     `;
//     return nodeInfoBlock;
//   } else {
//     return this.nope();
//   }
// }

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

// function checkNode(node) {
//   if (node.hasChildNodes()) {
//     iterateOverChildren(node);
//   } else {
//     return;
//   }
// }

// function iterateOverChildren(node) {
//   let children = node.childNodes;
//   for (const child of children) {
//     domWalker(child);
//   }
// }

const domRanger = (origin) => {
  const walker = document.createTreeWalker(origin, NodeFilter.SHOW_ALL);
  setProps(walker.currentNode);
  const block = new NodeBlock(
    nodeProperties.ndName,
    nodeProperties.ndType,
    nodeProperties.ndParent,
    nodeProperties.ndSibling,
    nodeProperties.ndLabel,
    nodeProperties.ndStyle
  );
  block.printNode();
  while (walker.nextNode()) {
    setProps(walker.currentNode);
    const block = new NodeBlock(
      nodeProperties.ndName,
      nodeProperties.ndType,
      nodeProperties.ndParent,
      nodeProperties.ndSibling,
      nodeProperties.ndLabel,
      nodeProperties.ndStyle
    );
    block.printNode();
  }
};

domRanger(document);
