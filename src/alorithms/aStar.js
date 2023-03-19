

export default function aStar(matrix) {

  // calculate F cost
  const calculateGHF = (node, neighbor) => {
    const nodeRow = Math.floor(node.num / 50);
    const nodeCol = node.num - (nodeRow * 50);

    const G = node.G <= neighbor.G + 1 ? node.G : neighbor.G + 1;
    const H = Math.abs(endNodeRow - nodeRow) + Math.abs(endNodeCol - nodeCol);
    const F = G + H;


    if (neighbor.G + 1 < node.G) {
      node.prev = neighbor;
    }

    node.F = F;
    node.G = G;
    node.H = H;

  }

  // update neighbors by getting unvisited neighbors and calculating their F cost
  const updateNeighbors = (node) => {
    const neighbors = getUnvisitedNeighbors(node, matrix);
    for (const neighbor of neighbors) {
      calculateGHF(neighbor, node);
      toSearch.filter(node => node.num === neighbor.num).length === 0 && toSearch.push(neighbor);
    }
  }

  // G === distance from start
  // H === distance from end
  // F === G + H

  let count = false;

  const startNode = matrix.find(node => node.status === 0);
  const endNode = matrix.find(node => node.status === 1);
  startNode.G = 0;

  const endNodeRow = Math.floor(endNode.num / 50);
  const endNodeCol = endNode.num - (endNodeRow * 50);

  const visitedNodes = [];
  const toSearch = [startNode];
  
  while (toSearch.length > 0) {
    sortNodesByDistance(toSearch);
    const closestNode = toSearch.shift();
    // wall
    if (closestNode.status === 2) continue;
    visitedNodes.push(closestNode);
    
    // found end node
    if (closestNode.status === 1) {
      const path = getPath(closestNode);
      return { visitedNodes, path };
    };
    closestNode.status = 4;    
    
    updateNeighbors(closestNode);

    count++;
    if (count > 2500) {
      console.error("infinity", toSearch);
      break
    };
  }

  return {visitedNodes};
  
}


  const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => {
      if (nodeA.F !== nodeB.F) {
        return nodeA.F - nodeB.F;
      }
      if (nodeA.G !== nodeB.G) {
        return nodeA.G - nodeB.G;
      }
      return nodeA.num - nodeB.num;
    });
  }



  const getUnvisitedNeighbors = (node, matrix) => {
    const neighbors = [];
    const { num } = node;
    // up
    if (num > 49) neighbors.push(matrix[num - 50]);
    // down
    if (num < 1450) neighbors.push(matrix[num + 50]);
    // left
    if (num % 50 !== 0) neighbors.push(matrix[num - 1]);
    // right
    if (num % 50 !== 49) neighbors.push(matrix[num + 1]);

    return neighbors.filter(neighbor => neighbor.status === 3 || neighbor.status === 2 || neighbor.status === 1 || neighbor.status === 5 || neighbor.status === 6);

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