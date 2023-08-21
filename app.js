import Node from './node.js';
import Tree from './tree.js';
import * as helper from './helper.js';

const arr = [];
for (let i = 0; i < Math.floor(Math.random() * 10 + 1); i++) {
  arr.push(Math.floor(Math.random() * 99));
}

const tree = new Tree(arr);
helper.prettyPrint(tree.root);
console.log(tree.isBalanced());

for (let i = 0; i < 6; i++) {
  tree.insert(Math.floor(Math.random() * 10 + 101));
}

helper.prettyPrint(tree.root);
console.log(tree.isBalanced());

tree.rebalance();

helper.prettyPrint(tree.root);
console.log(tree.isBalanced());
