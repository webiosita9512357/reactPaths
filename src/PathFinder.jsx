import React, { useState } from 'react'
import dijkstra from './alorithms/djikstra';
import Bar from './components/Bar';
import Node from './components/Node'

  const x = 30;
  const y = 50;

  const grid = [];

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      grid.push({num: (i * y + j), status: 'unvisited', distance: Infinity, prev: null})
    }
  }


const PathFinder = () => {
  const [mode, setMode] = useState(0);
  const [matrix, setMatrix] = useState(grid);

  const startVisualization = () => {
    const startNode = matrix.find((node) => node.status === 'start')
    const endNode = matrix.find((node) => node.status === 'end')
    dijkstra(matrix, setMatrix, startNode, endNode)

  }

  return  (
    <div style={styles.main}>
      <Bar setMode={setMode} mode={mode} start={startVisualization}/>
      <div style={styles.grid}>
        {matrix.map((node) => (
          <Node setMatrix={setMatrix} mode={mode} key={node.num} num={node.num} status={node.status} />
        ))}
      </div>
    </div>
  )
}

 const styles = {
  main: {
    width: '100vw',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  grid: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  }

  }

export default PathFinder