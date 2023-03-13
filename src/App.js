import React, {useState} from 'react';
import './App.css';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";

const initalLayouts = [
  {
    id: v4(),
    name: "Header Layout"
  },
  {
    id: v4(),
    name: "Subject Layout"
  }
]

function App() {

  const [inputText, setInputText] = useState("")

  const [state, setState] = useState({
    "header": {
      title: "Header",
      items: initalLayouts
    },
    "body": {
      title: "Body",
      items: []
    },
    "footer": {
      title: "Footer",
      items: []
    }
  })

  const handleDragEnd = ({destination, source}) => {
    if (!destination) {
      return
    }

    //destination => 0 index
    //source => 1 

    //arr[destina] = source
    //arr[source] = destination
    //return ar


    [1,2,3]
    [2] [1, 3] => [2,1,3]

    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    // Creating a copy of item before removing it from state
    const itemCopy = {...state[source.droppableId].items[source.index]}

    setState(prev => {
      prev = {...prev}
      // Remove from previous items array
      prev[source.droppableId].items.splice(source.index, 1)


      // Adding to new items array location
      prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

      return prev
    })
  }

  const addItem = () => {
    setState(prev => {
      return {
        ...prev,
        "header": {
          title: "Header",
          items: [
            {
              id: v4(),
              name: inputText
            },
            ...prev.header.items
          ]
        }
      }
    })

    setInputText("")
  }

  return (
    <div className="App">

      <div>
        <input type="text" placeholder='Add new item' value={inputText} onChange={(e) => setInputText(e.target.value)}/>
        <button className ='add-button' onClick={addItem}>Add</button>
      </div>
      
      
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          console.log(data,'data',key)
          return(
            <div key={key} className={"column"}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return(
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className={"droppable-col"}
                    >
                      {data.items.map((el, index) => {
                        return(
                          <Draggable key={el.id} index={index} draggableId={el.id}>
                            {(provided, snapshot) => {
                              console.log(snapshot)
                              return(
                                <div
                                  className={`item ${snapshot.isDragging && "dragging"}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {el.name}
                                </div>
                              )
                            }}
                          </Draggable>
                        )
                      })}
                      {provided.placeholder}
                    </div>
                  )
                }}
              </Droppable>
            </div>
          )
        })}
      </DragDropContext>

      </div>
  );
}

export default App;

//* Within the context, there is a map function that loops through an array called state. 
// For each item in the array, it creates a column with a title, and within the column, 
// there is a <Droppable> component.

//! The <Droppable> component takes a droppableId prop, 
// which is the key value from the state array. 
// It also takes a function that returns a JSX element, 
// which will be the contents of the droppable area.

//* Within the function, there is a <Draggable> component that takes a key, an index, and a draggableId prop. 
// The key prop is the unique identifier for each draggable item, 
//and the index prop is its position in the array. 

//The draggableId prop is also a unique identifier, 
//but it's used to link the draggable item with its corresponding <Droppable> component.

//! The function also returns a JSX element that will be the draggable item. 
// This element includes an isDragging property 
// that is used to apply a CSS class when the item is being dragged.
