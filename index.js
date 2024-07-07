const treeWalker = document.createTreeWalker(document, NodeFilter.SHOW_ALL, {
  acceptNode(node) {
    return NodeFilter.FILTER_ACCEPT;
  },
});

console.log(treeWalker.currentNode.nodeType);
