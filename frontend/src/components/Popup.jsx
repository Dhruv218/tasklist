import axios from "axios";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";

const Popup = ({ setShowPopup, popupContent, setUpdateUI }) => {
  const [input, setInput] = useState(popupContent.text);

  const updateToDo = () => {
    axios
      .put(`${baseURL}/update/${popupContent.id}`, input)
      .then((res) => {
        console.log(res.data);
        setUpdateUI((prevState) => !prevState);
        setShowPopup(false);
      });
  };

   const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showPriorityOptions, setShowPriorityOptions] = useState(false);

  const handleDropdownSelection = (field, value) => {
    setInput((prev) => ({
      ...prev,
      [field]: value,
    }));
    if(field=='Category'){
        setShowCategoryOptions(false)
    }
    else{
        setShowPriorityOptions(false)
    }
  };

  const handleSaveTask = () => {
    if (!input.toDo || !input.Category || !input.Priority) {
      alert("Please fill in all fields.");
      return;
    }

    updateToDo()
    setShowPopup(false);
  };

  return (
    <div className="backdrop">
      <div className="popup2">
        <RxCross1 className="cross" onClick={() => setShowPopup(false)} />
        <div className="popup-container">
          <div className="row input-container">
            <div className="select-menu">
              <div className="select" onClick={() => setShowCategoryOptions(!showCategoryOptions)}>
                <span>{input.Category === '' ? 'Select Language' : input.Category}</span>
                <i className="fas fa-angle-down"></i>
              </div>
              {showCategoryOptions && (
                <div className="options-list">
                  <div
                    className="option"
                    onClick={() => handleDropdownSelection('Category', 'Personal')}
                  >
                    Personal
                  </div>
                  <div
                    className="option"
                    onClick={() => handleDropdownSelection('Category', 'Work')}
                  >
                    Work
                  </div>
                  <div
                    className="option"
                    onClick={() => handleDropdownSelection('Category', 'Home')}
                  >
                    Home
                  </div>
                </div>
              )}
            </div>

            <div className="select-menu">
              <div className="select" onClick={() => setShowPriorityOptions(!showPriorityOptions)}>
                <span>{input.Priority === '' ? 'Select Priority' : input.Priority}</span>
                <i className="fas fa-angle-down"></i>
              </div>
              {showPriorityOptions && (
                <div className="options-list">
                  <div
                    className="option"
                    onClick={() => handleDropdownSelection('Priority', 'High')}
                  >
                    High
                  </div>
                  <div
                    className="option"
                    onClick={() => handleDropdownSelection('Priority', 'Medium')}
                  >
                    Medium
                  </div>
                  <div
                    className="option"
                    onClick={() => handleDropdownSelection('Priority', 'Low')}
                  >
                    Low
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row single-input">
            <input
              type="text"
              placeholder="Task Detail ..."
              value={input.toDo}
              onChange={(e) =>
                setInput((prev) => ({
                  ...prev,
                  toDo: e.target.value,
                }))
              }
            />
          </div>
          <button
            className="save-button"
            onClick={handleSaveTask}
          >
            Update Task +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
