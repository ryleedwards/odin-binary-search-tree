import Node from './node.js';
import * as helper from './helper.js';

class Tree {
  constructor(arr) {
    // clean up array before initializing root attribute
    let clean = helper.mergeSort(helper.removeDuplicates(arr));
    this.root = this.buildTree(clean);
  }

  buildTree(arr) {
    if (arr === null) throw new Error('Tree cannot be empty');
    let start = 0;
    let end = arr.length - 1;
    /* If start > end, implies end was calculated as
  arr.length {0} - 1 = -1  --> return null to escape */
    if (start > end) return null;
    let mid = Math.floor(start + end / 2);

    let leftArr = arr.slice(0, mid);
    let rightArr = arr.slice(mid + 1);
    let root = new Node(arr[mid]);
    if (leftArr.length > 0) {
      root.left = this.buildTree(leftArr);
    }
    if (rightArr.length > 0) {
      root.right = this.buildTree(rightArr);
    }
    return root;
  }

  insert(value) {
    const insertRec = function (node, value) {
      // If tree is empty, return a new node
      if (node == null && value != null) {
        return new Node(value);
      }

      // Otherwise, recur down the tree
      if (value < node.data) {
        node.left = insertRec(node.left, value);
      } else if (value > node.data) {
        node.right = insertRec(node.right, value);
      }
      return node;
    };
    // insert using recursion
    this.root = insertRec(this.root, value);
  }

  delete(data) {
    const deleteNode = function (node, data) {
      if (node == null) {
        return null;
      }
      if (data == node.data) {
        // node has no children
        if (node.left == null && node.right == null) {
          return null;
        }
        // node has no left child
        if (node.left == null) {
          return node.right;
        }
        // node has no right child
        if (node.right == null) {
          return node.left;
        }
        // node has two children
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = deleteNode(node.right, tempNode.data);
        return node;
      } else if (data < node.data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else if (data > node.data) {
        node.right = deleteNode(node.right, data);
        return node;
      }
    };
    this.root = deleteNode(this.root, data);
  }

  find(data) {
    if (this.root === null) return;
    let node = this.root;
    while (node !== null) {
      if (node.data == data) {
        return node;
      } else if (node.data < data) {
        if (node.right !== null) {
          node = node.right;
        }
      } else if (node.data > data) {
        if (node.left !== null) {
          node = node.left;
        }
      }
    }
    return node;
  }

  levelOrder(fn) {
    if (this.root === null) return;
    const result = [];
    const q = [];
    q.push(this.root);
    while (q.length > 0) {
      let current = q[0];
      result.push(q.shift());
      if (current.left !== null) q.push(current.left);
      if (current.right !== null) q.push(current.right);
    }
    // determine if valid func passed and perform or return array of vals
    if (fn !== undefined) {
      result.forEach((node) => {
        fn(node);
      });
    } else {
      const resultValues = [];
      result.forEach((node) => {
        resultValues.push(node.data);
      });
      return resultValues;
    }
  }

  inorder(fn) {
    const result = [];
    const inorderRec = function (node) {
      if (node === null) return;
      inorderRec(node.left);
      result.push(node);
      inorderRec(node.right);
    };
    inorderRec(this.root);
    // determine if valid func passed and perform or return array of vals
    if (fn !== undefined) {
      result.forEach((node) => {
        fn(node);
      });
    } else {
      const resultValues = [];
      result.forEach((node) => {
        resultValues.push(node.data);
      });
      return resultValues;
    }
  }

  preorder(fn) {
    const result = [];
    const preorderRec = function (node) {
      if (node === null) return;
      result.push(node);
      preorderRec(node.left);
      preorderRec(node.right);
    };

    preorderRec(this.root);

    // determine if valid func passed and perform or return array of vals
    if (fn !== undefined) {
      result.forEach((node) => {
        fn(node);
      });
    } else {
      const resultValues = [];
      result.forEach((node) => {
        resultValues.push(node.data);
      });
      return resultValues;
    }
  }

  postorder(fn) {
    const result = [];
    const postOrderRec = function (node) {
      if (node === null) return;
      postOrderRec(node.left);
      postOrderRec(node.right);
      result.push(node);
    };

    postOrderRec(this.root);

    // determine if valid func passed and perform or return array of vals
    if (fn !== undefined) {
      result.forEach((node) => {
        fn(node);
      });
    } else {
      const resultValues = [];
      result.forEach((node) => {
        resultValues.push(node.data);
      });
      return resultValues;
    }
  }

  height(node) {
    const hRec = function (node) {
      if (node === null) return -1;
      let leftH = hRec(node.left);
      let rightH = hRec(node.right);
      return Math.max(leftH, rightH) + 1;
    };
    return hRec(node);
  }

  depth(node) {
    let current = this.root;
    let depth = 0;
    while (current !== node) {
      depth++;
      // desired node is < current pointer -> move pointer LEFT
      if (node.data < current.data) {
        if (current.left) current = current.left;
      } // desired node > current pointer -> move pointer RIGHT
      else if (current.right) current = current.right;
    }
    return depth;
  }

  findMinHeight(node = this.root) {
    if (node === null) return -1;
    let left = this.findMinHeight(node.left);
    let right = this.findMinHeight(node.right);
    if (left < right) return left + 1;
    else return right + 1;
  }

  findMaxHeight(node = this.root) {
    if (node === null) return -1;
    let left = this.findMaxHeight(node.left);
    let right = this.findMaxHeight(node.right);
    if (left > right) return left + 1;
    else return right + 1;
  }

  isBalanced() {
    return this.findMinHeight() >= this.findMaxHeight() - 1;
  }

  rebalance() {
    let arr = this.levelOrder();
    let clean = helper.mergeSort(helper.removeDuplicates(arr));
    this.root = this.buildTree(clean);
  }
}
export default Tree;
