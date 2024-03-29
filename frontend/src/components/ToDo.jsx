import axios from "axios";
import React from "react";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { IoBagOutline } from "react-icons/io5";
import { FcHighPriority } from "react-icons/fc";

import { baseURL } from "../utils/constant";

const ToDo = ({ text, id, setUpdateUI, setShowPopup, setPopupContent }) => {
  const deleteTodo = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const updateToDo = () => {
    console.log(text);
    setPopupContent({ text, id });
    setShowPopup(true);
  };

  return (
    <> 
     <div className="toDo">
    <div className="taskitem">
      <div className="flex-box"> <IoBagOutline className="icon"/><h6 className="taskcate">{text.Category}</h6> </div>
      <div className="flex-box"> <FcHighPriority className="icon"/><h6 className="taskprio">{text.Priority}</h6> </div>

       </div>
      
      <div className="contatodo"> 
      {text.toDo}
      <div className="icons">
        <AiFillEdit className="icon" onClick={updateToDo} />
        <RxCross1 className="icon" onClick={deleteTodo} />
      </div>
      </div>
    </div>
    </>
  );
};

export default ToDo;
