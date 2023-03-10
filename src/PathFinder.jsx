import React, { useState } from 'react'
import dijkstra from './alorithms/djikstra';
import Bar from './components/Bar';
import Node from './components/Node'

  const x = 30;
  const y = 50;

  const grid = [];

  for (let i = 0; i < x; i++) {
    for (let j = 0; j < y; j++) {
      grid.push({num: (i * y + j), status: 3, distance: Infinity, prev: null})
    }
  }

  grid[0].status = 0;
  grid[grid.length - 1].status = 1;




const PathFinder = () => {
  const [mode, setMode] = useState(0);
  const [alg, setAlg] = useState(0);
  const [matrix, setMatrix] = useState(grid);
  const [disabledChoice, setDisabledChoice] = useState(false);

  const clearMatrix = () => {
    setDisabledChoice(false);
    setMatrix((prev) => {
      const newMatrix = [...prev]
      newMatrix.forEach((node) => {
        node.distance = Infinity;
        node.prev = null;
        if (node.status !== 0 && node.status !== 1) {
          node.status = 3;
        }
      })
      return newMatrix
    })
  }


    const Animate = (result) => {
      setDisabledChoice(true);
      const {visitedNodes, path} = result;
      const processSpeed = 5;
        for (let i = 0; i < visitedNodes.length; i++) {
          setTimeout(() => {
            setMatrix((prev) => {
                const newMatrix = [...prev]
                if (i === 0) {
                  newMatrix[visitedNodes[i].num].status = 0
                  return newMatrix
                }
                newMatrix[visitedNodes[i].num].status = 5
                return newMatrix
              })
            }, processSpeed * i)
      }
      
    setTimeout(() => {
      if (!path) {
        alert('No path found!')
        return;
      }
      for (let i = 0; i < path.length; i++) {
        setTimeout(() => {
          setMatrix((prev) => {
            const newMatrix = [...prev]
            if (i === path.length - 1) {
              newMatrix[path[i].num].status = 1
              return newMatrix
            }
            if (i === 0) {
              newMatrix[path[i].num].status = 0
              return newMatrix
            }
            newMatrix[path[i].num].status = 6
            return newMatrix
          })
        }, 15 * i)
      }
    }, processSpeed * visitedNodes.length)
  }



  const startVisualization = () => {
    if (alg === 0) {
      const result = dijkstra(matrix, setMatrix);
      Animate(result);
    }
    if (alg === 1) {
      // const result = aStar(matrix, setMatrix);
      // Animate(result);
      console.log("start A*")
    }
    
  }

  return  (
    <div style={styles.main}>
      <Bar alg={alg} setAlg={setAlg} disabledChoice={disabledChoice} setMode={setMode} mode={mode} start={startVisualization} clear={clearMatrix} />
      <div style={styles.center}>
        <div style={styles.grid}>
          {matrix.map((node) => (
            <Node disabledChoice={disabledChoice} setMatrix={setMatrix} mode={mode} key={node.num} num={node.num} status={node.status} />
            ))}
        </div>
      </div>
    </div>
  )
}

 const styles = {
  main: {
    maxWidth: '1000px',
    margin: '0 auto',
  },
  center: {
    width: '100vw',
    maxWidth: '1000px',
    position: "absolute",
    top: "57%",
    left: "50%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%) "
  },
  grid: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
  }

  }

export default PathFinder