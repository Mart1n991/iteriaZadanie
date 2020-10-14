import React, {useState} from 'react';
import Chance from 'chance'; /*Library for random integers */

import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

const code = `
function App() {
  const [data, setData] = useState({
    columnHeading: '',
    labelHeading: '',
    columnInputs: [],
    labelInputs: 'Name of Label',
  })

  //Error text for empty inputs from user
  const errorText = 'Názov musí mať aspoň 1 znak'

  const onInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const onSubmitAddColumn = (event) => {
    event.preventDefault();
    if(data.columnHeading <= 0) {
      window.alert(errorText)
    } else {
      setData({
        ...data,
        columnInputs: [...data.columnInputs, data.columnHeading],
        columnHeading: '',
      })
    }
  }

  const onSubmitEditLabel = (event) => {
    event.preventDefault();

    if(data.labelHeading <= 0) {
      window.alert(errorText)
    } else {
      setData({
        ...data,
        labelHeading: '',
        labelInputs: [data.labelHeading],
      })
    }  
  }

  const insertTd = () => {
    
    const chance = new Chance(); //Instantiate Chance so it can be used
    const randomInteger = chance.integer({ min: 0, max: 20 }); //Generate random integer from 0 to 20

    return(
     data.columnInputs.map((column, index) => {
        return (
         <td key={index}>{index + randomInteger}</td>
        )
      })
    )
  }
  
  return (

    <div className='app-container'>
        <div className='input-container'>
          <label>New column</label>
          <input autoFocus type='text' value={data.columnHeading} name='columnHeading' onChange={onInputChange}></input>
        
          <label>New label</label>
          <input type='text' value={data.labelHeading} name='labelHeading'  onChange={onInputChange}></input>
        </div>
        
        <div className='buttons'>
          <button className='button-1' onClick={onSubmitAddColumn}>Add New Column</button>
          <button className='button-2' onClick={onSubmitEditLabel}>Edit label</button>
        </div> 
      

      <div className='app-result'>
        <div className='input-container'>
          <label>{data.labelInputs}</label>
          <input type='text' ></input>
        </div>
      </div>

      <table className='table'>
        <tbody>
          <tr className='row'>
            <th>ID</th>
            <th>Name</th>
            {data.columnInputs.map((column, index) => {
              return (
                <th key={index}>{column}</th>
              )
            })}
          </tr>

          <tr className='row'>
            <td>1</td>
            <td>Produkt 1</td>
            {insertTd()}
          </tr>

          <tr className='row'>
            <td>2</td>
            <td>Produkt 2</td>
            {insertTd()}
          </tr>
        </tbody>
      </table>
    </div>
  );
}`

const AppLive = () => {
  return(
  <LiveProvider code={code} scope={{ useState, Chance }}>
      <LiveEditor />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  )
}

export default AppLive;
