

export default function dijkstra(matrix, setMatrix) {

  let endNode = null;
  const visitedNodes = [];
  const startNode = matrix.find(node => node.status === 0);

  const unvisitedNodes = matrix.filter(node => node.status !== 2);

  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift();
    if (closestNode.status === 1) return visitedNodes;
    closestNode.status = 4;
    visitedNodes.push(closestNode);
    updateUnvisitedNeighbors(closestNode, matrix);
  }

 }

 const sortNodesByDistance = (unvisitedNodes) => {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
 }

 const updateUnvisitedNeighbors = (node, matrix) => {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, matrix);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
 }

const getUnvisitedNeighbors = (node, matrix) => {
  const neighbors = [];
  const { num } = node;
  if (num > 49) neighbors.push(matrix[num - 50]);
  if (num < matrix.length - 49) neighbors.push(matrix[num + 50]);
  if (num % 50 !== 0) neighbors.push(matrix[num - 1]);
  if (num + 1 % 50 !== 0) neighbors.push(matrix[num + 1]);

  console.log(neighbors)
  return neighbors.filter(neighbor => neighbor.status === 3);
}