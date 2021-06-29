import React from "react";
import { useDispatch } from "react-redux";
import { uploadHidden } from "../../../reducers/uploadReducer";
import style from "./Uploader.module.css";
import UploaderFile from "./UploaderFile/UploaderFile";

function Uploader({fileName, filePercent}) {
    const dispatch = useDispatch()

  return (
    <div className={style.uploader}>
        <div className={style.uploaderBtn} onClick={()=>{dispatch(uploadHidden())}}>X</div>
        <div className={style.uploaderTitle}>{filePercent == 100 ? 'Загрузка завершена' : 'Загрузка'}</div>
        <UploaderFile fileName={fileName} filePercent={filePercent}/>
    </div>
  );
}

export default Uploader;
