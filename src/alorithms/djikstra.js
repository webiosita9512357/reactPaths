

// figure out start node
// get neighbors of start
// set distance of neighbors
// set previous node of neighbors
// set start node to visited
// get unvisited neighbors of neighbors
// set distance of unvisited neighbors
// set previous node of unvisited neighbors
// set neighbors to visited
// repeat until all nodes are visited

export default function dijkstra(matrix) {
  
  const startNode = matrix.find(node => node.status === 0);
  startNode.F = 0;
  const visitedNodes = [];
  const unvisitedNodes = [...matrix];


  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    // wall
    if (closestNode.status === 2) continue;
    // no more epmty nodes
    if (closestNode.F === Infinity) return {visitedNodes};
    if (closestNode.status === 1) {
      const path = getPath(closestNode);
      return {visitedNodes, path};
    };
    closestNode.status = 4;
    visitedNodes.push(closestNode);
    updateNeighbors(closestNode, matrix);


  }

 }

 const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.F - nodeB.F);
 }

  const updateNeighbors = (node, matrix) => {
      const neighbors = getUnvisitedNeighbors(node, matrix);
      for (const neighbor of neighbors) {
        neighbor.F = node.F + 1;
        neighbor.prev = node;
      }
    }



  const getUnvisitedNeighbors = (node, matrix) => {
    const neighbors = [];
    const { num } = node;
    // up
    if (num > 49) neighbors.push(matrix[num - 50]);
    // down
    if (num < matrix.length - 50) neighbors.push(matrix[num + 50]);
    // left
    if (num % 50 !== 0) neighbors.push(matrix[num - 1]);
    //  right
    if (((num + 1) % 50) !== 0) neighbors.push(matrix[num + 1]);

    return neighbors.filter(neighbor => neighbor.status === 3 || neighbor.status === 1);
  }

  const getPath = (node) => {
    const path = [];
    let currentNode = node;
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = currentNode.prev;
    }
    return path;
  }