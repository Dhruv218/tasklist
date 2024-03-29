import React, { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import axios from "axios";
import { baseURL } from "./utils/constant";
import Popup from "./components/Popup";
import Newlist from "./components/NewList";

const App = () => {
  const [toDos, setToDos] = useState([]);
  const [alltoDos, setallToDos] = useState([]);
   const [updateUI, setUpdateUI] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});
  const [showaddPopup, setshowaddPopup] = useState(false)
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);
  const [selectedcategory, setselectedcategory] = useState('');
  const [selectedPriority, setselectedPriority] = useState('');
  const [input, setInput] = useState('');

  function filterAndSortArray(array, selectedCategory, selectedPriority) {
    // Filter based on selected category
    let filteredArray = array;
    if (selectedCategory !== 'All') {
      filteredArray = filteredArray.filter(item => item.Category === selectedCategory);
    }
  
    // Sort based on selected priority
    let sortedArray = filteredArray;
    if (selectedPriority === 'High') {
      sortedArray = filteredArray.sort((a, b) => {
        if (a.Priority === 'High') return -1;
        if (b.Priority === 'High') return 1;
        return 0;
      });
    } else if (selectedPriority === 'Medium') {
      sortedArray = filteredArray.sort((a, b) => {
        if (a.Priority === 'Medium') return -1;
        if (b.Priority === 'Medium') return 1;
        return 0;
      });
    } else if (selectedPriority === 'Low') {
      sortedArray = filteredArray.sort((a, b) => {
        if (a.Priority === 'Low') return -1;
        if (b.Priority === 'Low') return 1;
        return 0;
      });
    }
    console.log(sortedArray,selectedCategory,selectedPriority);
    return sortedArray;
  }

  useEffect(() => {
    setToDos(filterAndSortArray(alltoDos,(selectedcategory==''?'ALL':selectedcategory),selectedPriority ))
   
  }, [selectedcategory,selectedPriority])
  
  useEffect(() => {
    axios
      .get(`${baseURL}/get`)
      .then((res) =>{setallToDos(res.data)
         setToDos(res.data)})
      .catch((err) => console.log(err));
  }, [updateUI]);

  const saveToDo = (input) => {
    axios
      .post(`${baseURL}/save`, input)
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
       })
      .catch((err) => console.log(err));
  };

  return (
    <main>
      <div className="container">
        <h1 className="title">Tasks List</h1>

        <div className="input_holder">
        <div className="select-menu">
              <div className="select" onClick={() => setShowPriorityOptions(!showPriorityOptions)}>
                <span>{selectedcategory === '' ? 'Select Category' : selectedcategory }</span>
                <i className="fas fa-angle-down"></i>
              </div>
              {showPriorityOptions && (
                <div className="options-list">
                  <div
                    className="option"
                    onClick={() =>{ setShowPriorityOptions(!showPriorityOptions)
                    setselectedcategory('Personal')}}>
                    Personal
                  </div>
                  <div
                    className="option"
                    onClick={() =>{ setShowPriorityOptions(!showPriorityOptions)
                      setselectedcategory('Work')}}>
                    Work
                  </div>
                  <div
                    className="option"
                    onClick={() =>{ setShowPriorityOptions(!showPriorityOptions)
                      setselectedcategory('Home')}}>
                    Home
                  </div>
                </div>
              )}
            </div>
            <div className="select-menu">
              <div className="select" onClick={() =>{ setShowCategoryOptions(!showCategoryOptions)}}>
                <span>{selectedPriority  === '' ? 'Select Priority' : selectedPriority }</span>
                <i className="fas fa-angle-down"></i>
              </div>
              {showCategoryOptions && (
                <div className="options-list">
                  <div
                    className="option"
                    onClick={() =>{ setselectedPriority('High')
                    setShowCategoryOptions(!showCategoryOptions)}}
                   >
                    High
                  </div>
                  <div
                    className="option"
                    onClick={() =>{ setselectedPriority('Medium')
                    setShowCategoryOptions(!showCategoryOptions)}}
                   >
                    Medium
                  </div>
                  <div
                    className="option"
                    onClick={() =>{ setselectedPriority('Low')
                    setShowCategoryOptions(!showCategoryOptions)}}
                   >
                    Low
                  </div>
                </div>
              )}
            </div>
          <button onClick={()=>setshowaddPopup(true)}>+ Add</button>
        </div>

        <div className="list">
          {toDos.map((el) => (
            <ToDo
              key={el._id}
              text={el}
              id={el._id}
              setUpdateUI={setUpdateUI}
              setShowPopup={setShowPopup}
              setPopupContent={setPopupContent}
            />
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          setShowPopup={setShowPopup}
          popupContent={popupContent}
          setUpdateUI={setUpdateUI}
        />
      )}
      {showaddPopup && (
        <Newlist
          setShowPopup={setshowaddPopup}
          popupContent={popupContent}
          setUpdateUI={saveToDo}
        />
      )}
    </main>
  );
};

export default App;
