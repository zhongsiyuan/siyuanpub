class Node {
  constructor(node, next = null) {
    this.node = node;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = new Node('head');
  }

  append(node) {
    if (node) {
      this.findLast().next = new Node(node);
    }

    return this;
  }

  findLast() {
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    return currentNode;
  }
}

const l1 = new LinkedList();
l1.append('f').append('s').append('t');
console.log(l1, JSON.stringify(l1));


function reverseLinkedList(head) {
  let currentNode = head;
  let prevPointer = null;
  let nextPointer = null;
  while(true) {
    if (currentNode.next === null) {
      break;
    }
  }
}
