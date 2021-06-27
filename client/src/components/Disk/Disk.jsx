import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilesApi, uploadFileApi } from "../../api/files";
import { setCurrentDir } from "../../reducers/fileReducer";
import style from "./Disk.module.css";
import FileList from "./FileList/FileList";
import Popup from "./Popup/Popup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileUpload, faFolderPlus, faUndo,  } from "@fortawesome/free-solid-svg-icons";
import Uploader from "./Uploader/Uploader";


function Disk() {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  const dirStack = useSelector((state) => state.files.dirStack);
  const [isPopupHidden, setIsPopupHidden] = useState(true);
  const isUploaderVisible = useSelector(state=>state.upload.visible)
  const uploaderFileName = useSelector(state=>state.upload.file)
  const uploaderFilePercent = useSelector(state=>state.upload.percentUploadingFile)

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
    const files = [...e.target.files]
     files.forEach(file=>dispatch(uploadFileApi(file, currentDir))) 
  }

  return (
    <div className={style.disk}>
      <div className={style.navigation}>
        {currentDir && <button onClick={() => backClickHandler()}>Back <FontAwesomeIcon icon={faUndo}/></button>}
        <button onClick={showPopup}>New folder <FontAwesomeIcon icon={faFolderPlus}/> </button>
        <div className={style.fileUploadInputBlock}>
            <label htmlFor="fileUploadInput">Upload file <FontAwesomeIcon icon={faFileUpload}/></label>
            <input type="file" id="fileUploadInput" className={style.fileUploadInput} onChange={uploadFileHandle}/>
        </div>
      </div>
      <FileList />
      {!isPopupHidden && <Popup closePopup={setIsPopupHidden} />}
    {isUploaderVisible && <Uploader fileName={uploaderFileName} filePercent={uploaderFilePercent}/>}
    </div>
  );
}

export default Disk;
