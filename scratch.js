function deleteNode(root, k) {
  // Base case
  if (root === null) {
    return root;
  }

  // Recursive calls for ancestors of
  // node to be deleted
  if (root.key > k) {
    root.left = deleteNode(root.left, k);
    return root;
  } else if (root.key < k) {
    root.right = deleteNode(root.right, k);
    return root;
  }

  // We reach here when root is the node
  // to be deleted.

  // If one of the children is empty
  if (root.left === null) {
    let temp = root.right;
    delete root;
    return temp;
  } else if (root.right === null) {
    let temp = root.left;
    delete root;
    return temp;
  }

  // If both children exist
  else {
    let succParent = root;

    // Find successor
    let succ = root.right;
    while (succ.left !== null) {
      succParent = succ;
      succ = succ.left;
    }

    // Delete successor.  Since successor
    // is always left child of its parent
    // we can safely make successor's right
    // right child as left of its parent.
    // If there is no succ, then assign
    // succ.right to succParent.right
    if (succParent !== root) {
      succParent.left = succ.right;
    } else {
      succParent.right = succ.right;
    }

    // Copy Successor Data to root
    root.key = succ.key;

    // Delete Successor and return root
    delete succ;
    return root;
  }
}
