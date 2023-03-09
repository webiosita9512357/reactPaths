
 const getColor = (status) => {
  switch (status) {
    case 'unvisited':
      return 'aliceblue'
    case 'start':
      return 'green'
    case 'end':
      return 'red'
    case 'wall':
      return 'black'
    case 'visited':
      return 'lightblue'
    case 'shortest':
      return 'yellow'
    default:
      return 'aliceblue'
  }
 }



const Node = ({num, mode, setMatrix, status}) => {

  const styles = {
  node: {
    backgroundColor: getColor(status),
    border: "1px solid #1c2d41",
    width: "2vw",
    maxWidth: "28px",
    height: "2vw",
    maxHeight: "28px",
  }
}

  return (
    <div
      style={styles.node}
      onClick={() => {
        setMatrix((prev) => {
          if (mode === 'start' || mode === 'end') {
            const newMatrix = [...prev]
            newMatrix.forEach((node) => {
              if (node.status === mode) {
                node.status = 'unvisited'
              }
            })
            newMatrix[num].status = mode
            return newMatrix
          } else {
            const newMatrix = [...prev]
            newMatrix[num].status = mode
            return newMatrix
          }
        })
        }
      }
    >

    </div>
  )
}

export default Node