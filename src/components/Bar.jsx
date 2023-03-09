import React from 'react'

 const modes = [{id: 0, name: "Start"}, {id: 1, name: "End"}, {id: 2, name: "Wall"}, {id: 3, name: "Clear"}]

const Bar = ({mode, setMode, start}) => {
  return (
    <div style={styles.main}>
      <div>
      {modes.map((Item) => (
        <button
        key={Item.id}
        style={{...styles.button, backgroundColor: Item.id === mode? "#fb5607": styles.button.backgroundColor}} 
        onClick={() => setMode(Item.id)}>
          {Item.name}
        </button>
      ))}
      </div>
      <button 
      style={styles.button}
      onClick={start}
      >
        Visualize
      </button>
    </div>
  )
}

 const styles = {
  main: {
    width: "90%",
    color: "white",
    margin: "60px 0px",
    display: "flex",
    justifyContent: "space-around",
  },
  button: {
    backgroundColor: "#ffd60a",
    color: "black",
    border: "none",
    padding: "10px",
    borderRadius: "5px",
    margin: "0px 5px",
    cursor: "pointer",
  }
 }


export default Bar