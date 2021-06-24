import React, { useState } from "react";
import style from "./Popup.module.css"
import Input from "../../../utils/Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { createFileApi } from "../../../api/files";

function Popup(props) {
    const [text, setText] = useState('')
    const currentDir = useSelector(state=>state.files.currentDir)
    const dispatch = useDispatch()

    function closePopup(){
        props.closePopup(true)
    }

    function handleCreateDir(){
        dispatch(createFileApi(currentDir, text))
        closePopup()
    }

  
    return (
    <div className={style.popupWrapper} onClick={closePopup}>
        <div className={style.popupBody} onClick={(e)=>e.stopPropagation()}>
            <div>Create new File</div>
            <div><Input type="text" placeholder="Введите название файла" value={text} setValue={setText}/></div>
            <div><button onClick={handleCreateDir}>Create</button></div>   
            <div className={style.popupClose} onClick={closePopup}>X</div>   
        </div>
        
    </div>
  );
}

export default Popup;
