import React from "react";
import style from "./UploaderFile.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function UploaderFile({fileName, filePercent}) {

    return (
    <div className={style.uploaderFile}>
           <div>{fileName}</div>
           <div>{filePercent === 100 ? <FontAwesomeIcon icon={faCheck}/> : filePercent + '%'}  </div>        
    </div>
  );
}

export default UploaderFile;
