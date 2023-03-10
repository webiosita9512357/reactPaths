import React from 'react'

 const modes = [{id: 0, name: "Start"}, {id: 1, name: "End"}, {id: 2, name: "Wall"}, {id: 3, name: "Clear"}]

const Bar = ({mode, setMode, start, clear, disabledChoice}) => {
  return (
    <div style={styles.main}>
      <div style={styles.buttonBackground}>
      {modes.map((Item) => (
        <button
          disabled={disabledChoice}
          key={Item.id}
          style={{...styles.button,
            backgroundColor: Item.id === mode? "#fb5607": styles.button.backgroundColor,
            opacity: disabledChoice? 0.5: 1,
          }} 
          onClick={() => setMode(Item.id)}>
            {Item.name}
        </button>
      ))}
      </div>
      <div style={styles.buttonBackground}>
        <button 
          style={styles.button}
          onClick={clear}
        >
          Clear
        </button>
        <button 
          style={styles.button}
          onClick={start}
        >
          Visualize
        </button>
      </div>
      <div style={styles.buttonBackground}>
         <button 
          style={styles.button}
          onClick={clear}
        >
          Dijkstra
        </button>
        <button 
          style={styles.button}
          onClick={start}
        >
          A*
        </button>
      </div>
      {disabledChoice && <p style={styles.disabledText}>*To change parameters clear the Grid</p>}
    </div>
  )
}

 const styles = {
  main: {
    width: "90%",
    color: "white",
    height: "100px",
    margin: "0px auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  button: {
    backgroundColor: "#ffd60a",
    fontWeight: "bold",
    width: "100px",
    color: "black",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    margin: "5px 5px",
    cursor: "pointer",
  },
  disabledText: {
    color: "#fff",
    position: "absolute",
    bottom: -15,
    left: 0,
  },
  buttonBackground: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "1px",
  }
 }


export default Bar