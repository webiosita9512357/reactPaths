
 const getColor = (status) => {
  switch (status) {
    case 3:
      return 'aliceblue'
    case 0:
      return 'MediumSeaGreen'
    case 1:
      return 'DarkRed'
    case 2:
      return 'black'
    case 4:
      return 'aliceblue'
    case 5:
      return 'lightblue'
    case 6:
      return 'RoyalBlue'
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
    cursor: "pointer",
    
  }
}

  return (
    <div
      style={styles.node}
      onClick={() => {
        setMatrix((prev) => {
          if (mode === 1 || mode === 0) {
            const newMatrix = [...prev]
            newMatrix.forEach((node) => {
              if (node.status === mode) {
                node.status = 'clear'
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

      onDragOver={() => {
        if (mode === 2 || mode === 3) {
          setMatrix((prev) => {
            const newMatrix = [...prev]
            newMatrix[num].status = mode
            return newMatrix
          })
        }
      }}
    >

    </div>
  )
}

export default Node