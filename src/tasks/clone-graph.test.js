import { expect, test } from "vitest";

function Node(val, neighbors) {
  this.val = val === undefined ? 0 : val;
  this.neighbors = neighbors === undefined ? [] : neighbors;
}

function t(node) {
  // 1. create a new node
  // 2. add the new node to the queue
  // 3. add the new node to the visited map
  // 4. while the queue is not empty
  // 5.    get the first node from the queue
  // 6.    for each neighbor of the node
  // 7.        if the neighbor is not in the visited map
  // 8.            create a new node
  // 9.            add the new node to the queue
  // 10.           add the new node to the visited map
  // 11.       add the new node to the neighbors of the new node
  if (!node) return null;

  let newNode = new Node(node.val);
  let queue = [node];
  let visited = new Map();

  visited.set(node, newNode);

  while (queue.length > 0) {
    let currentNode = queue.shift();

    for (let neighbor of currentNode.neighbors) {
      if (!visited.has(neighbor)) {
        let newNeighbor = new Node(neighbor.val);

        queue.push(neighbor);
        visited.set(neighbor, newNeighbor);
      }
      visited.get(currentNode).neighbors.push(visited.get(neighbor));
    }
  }
  return newNode;
}

test("Clone Graph", () => {
  function createTestNode() {
    const node1 = new Node(1);
    const node2 = new Node(2);
    const node3 = new Node(3);
    const node4 = new Node(4);

    node1.neighbors.push(node2, node4);
    node2.neighbors.push(node2, node3);
    node3.neighbors.push(node2, node4);
    node4.neighbors.push(node1, node3);

    return node1;
  }

  expect(t(createTestNode())).toEqual(createTestNode());
});
