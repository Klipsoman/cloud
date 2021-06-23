import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilesApi } from "../../api/files";
import { setCurrentDir } from "../../reducers/fileReducer";
import style from "./Disk.module.css";
import FileList from "./FileList/FileList";
import Popup from "./Popup/Popup";

function Disk() {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const dirStack = useSelector(state => state.files.dirStack)
    const [isPopupHidden, setIsPopupHidden] = useState(true)

    useEffect(()=>{
        dispatch(getFilesApi(currentDir))
    },[currentDir])

    function showPopup(){
        setIsPopupHidden(false)
    }
    function backClickHandler(){
        const backDir = dirStack.pop()
        dispatch(setCurrentDir(backDir))
    }

  return (
    <div className={style.disk}>
        <div className={style.navigation}>          
        {currentDir && <button onClick={()=>backClickHandler()}>Back</button>}
            <button onClick={showPopup}>new File</button>
        </div>
        <FileList />
        {!isPopupHidden && <Popup closePopup={setIsPopupHidden}/>}
    </div>
  );
}

export default Disk;
