
 const getColor = (status) => {
  switch (status) {
    case 3:
      return 'aliceblue'
    case 0:
      return 'MediumSeaGreen'
    case 1:
      return 'DarkRed'
    case 2:
      return '#1c2d41'
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



const Node = ({num, mode, setMatrix, status, disabledChoice}) => {

  const styles = {
  node: {
    backgroundColor: getColor(status),
    border: "1px solid #1c2d41",
    width: "2vw",
    maxWidth: "20px",
    height: "2vw",
    maxHeight: "20px",
    cursor: "pointer",
    transition: "all 0.4s",
  }
}

  return (
    <div
      style={styles.node}
      onClick={() => {
        !disabledChoice && setMatrix((prev) => {
          if (mode === 1 || mode === 0) {
            const newMatrix = [...prev]
            newMatrix.forEach((node) => {
              if (node.status === mode) {
                node.status = 3;
              }
            })
            newMatrix[num].status = mode;
            return newMatrix
          } else {
            const newMatrix = [...prev];
            newMatrix[num].status = mode;
            return newMatrix;
          }
          })
        }
      }

      onDragOver={() => {
        if (mode === 2 || mode === 3) {
          !disabledChoice && setMatrix((prev) => {
            const newMatrix = [...prev];
            newMatrix[num].status = mode;
            return newMatrix;
          })
        }
      }}
    >

    </div>
  )
}

export default Node