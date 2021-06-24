import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilesApi, uploadFileApi } from "../../api/files";
import { setCurrentDir } from "../../reducers/fileReducer";
import style from "./Disk.module.css";
import FileList from "./FileList/FileList";
import Popup from "./Popup/Popup";

function Disk() {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const [isPopupHidden, setIsPopupHidden] = useState(true);

  useEffect(() => {
    dispatch(getFilesApi(currentDir));
  }, [currentDir]);

  function showPopup() {
    setIsPopupHidden(false);
  }
  function backClickHandler() {
    const backDir = dirStack.pop();
    dispatch(setCurrentDir(backDir));
  }
  function uploadFileHandle(e){
     dispatch(uploadFileApi(e.target.files[0], currentDir))
  }

  return (
    <div className={style.disk}>
      <div className={style.navigation}>
        {currentDir && <button onClick={() => backClickHandler()}>Back</button>}
        <button onClick={showPopup}>New file</button>
        <div className={style.fileUploadInputBlock}>
            <label htmlFor="fileUploadInput">Upload file</label>
            <input type="file" id="fileUploadInput" className={style.fileUploadInput} onChange={uploadFileHandle}/>
        </div>
      </div>
      <FileList />
      {!isPopupHidden && <Popup closePopup={setIsPopupHidden} />}
    </div>
  );
}

export default Disk;
