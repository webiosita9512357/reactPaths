

export default function aStar(matrix) {

  // calculate F cost
  const calculateGHF = (node, neighbor) => {
    const nodeRow = Math.floor(node.num / 50);
    const nodeCol = node.num - (nodeRow * 50);


    const G = node.G <= neighbor.G + 1 ? node.G : neighbor.G + 1;
    const H = Math.abs(endNodeRow - nodeRow) + Math.abs(endNodeCol - nodeCol);
    const F = G + H;


    if (neighbor.G < node.G) {
      node.prev = neighbor;
    }

    node.F = F;
    node.G = G;
    node.H = H;

    if (toSearch.indexOf((el) => el.num === node.num) === -1 && node.status !== 4) {
      toSearch.push(node);
    }

  }

  // update neighbors by getting unvisited neighbors and calculating their F cost
  const updateNeighbors = (node) => {
    const neighbors = getUnvisitedNeighbors(node, matrix);
    for (const neighbor of neighbors) {
      calculateGHF(neighbor, node);
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
    console.log(closestNode.num)
    // wall
    if (closestNode.status === 2) continue;
    // found end node
    if (closestNode.status === 1) {
      const path = getPath(closestNode);
      return { visitedNodes, path };
    };
    
    // no nodes to search
    if (toSearch.length === 0 && closestNode.status !== 0) return {visitedNodes};

    visitedNodes.push(closestNode);
    closestNode.status = 4;
    
    updateNeighbors(closestNode);

    count++;
    if (count > 2500) {
      console.log("infinity", toSearch);
      break
    };
  }





  
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

    return neighbors.filter(neighbor => neighbor.status !== 4 || neighbor.status !== 1 || neighbor.status !== 2);
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