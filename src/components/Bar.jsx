import React from 'react'

 const modes = [{id: 0, name: "Start"}, {id: 1, name: "End"}, {id: 2, name: "Wall"}, {id: 3, name: "Clear"}]
  const algorithms = [{id: 0, name: "Dijkstra"}, {id: 1, name: "A*"}]

const Bar = ({disableStarters, mode, setMode, start, clear, disabledChoice, reset, alg, setAlg}) => {
  return (
  <div>
    {<p style={styles.disabledText}>{disabledChoice && "*To change parameters clear or reset the Grid"}</p>}
    <div style={styles.main}>
      <div style={styles.buttonBackground}>
        <button 
          disabled={disableStarters}
          style={{...styles.button, backgroundColor: "crimson", color: "white", opacity: disableStarters? 0.5: 1,}}
          onClick={clear}
        >
          Clear
        </button>
        <button 
          disabled={disableStarters}
          style={{...styles.button, backgroundColor: "#ca5310", color: "white", opacity: disableStarters? 0.5: 1,}}
          onClick={reset}
        >
          Reset
        </button>
        <button 
          disabled={disableStarters}
          style={{...styles.button, backgroundColor: "darkGreen", color: "white", opacity: disableStarters? 0.5: 1,}}
          onClick={start}
        >
          Visualize
        </button>
      </div>
      <div style={styles.buttonBackground}>
        {modes.map((Item) => (
          <button
            disabled={disabledChoice}
            key={Item.id}
            style={{...styles.button,
              backgroundColor: Item.id === mode? "#42a5f5": styles.button.backgroundColor,
              opacity: disabledChoice? 0.5: 1,
            }} 
            onClick={() => setMode(Item.id)}>
              {Item.name}
          </button>
        ))}
      </div>
      <div style={styles.buttonBackground}>
        {algorithms.map((Item) => (
          <button
            disabled={disabledChoice}
            key={Item.id}
            style={{...styles.button,
              backgroundColor: Item.id === alg? "#42a5f5": styles.button.backgroundColor,
              opacity: disabledChoice? 0.5: 1,
            }}
            onClick={() => setAlg(Item.id)}
          >
            {Item.name}
          </button>
        ))}
      </div>
    </div>
  </div>
  )
}

 const styles = {
  main: {
    width: "100%",
    color: "white",
    height: "fit-content",
    margin: "0px auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
  },
  button: {
    backgroundColor: "#bbdefb",
    fontWeight: "bold",
    width: "80px",
    color: "black",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    margin: "5px 5px",
    cursor: "pointer",
  },
  disabledText: {
    color: "#fff",
    height: "15px",
  },
  buttonBackground: {
    backgroundColor: "#fff",
    borderRadius: "5px",
    padding: "3px",
    margin: "5px",
    justifyContent: "center",
    display: "flex",
    flexWrap: "wrap",
  }
 }


export default Bar