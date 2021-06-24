import React from "react";
import style from "./File.module.css";
import folderLogo from "../../../../assets/imgs/folderLogo.png";
import fileLogo from "../../../../assets/imgs/fileLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { pushToStack, setCurrentDir } from "../../../../reducers/fileReducer";

function File({ file }) {
  const dispatch = useDispatch();
  const currentDir = useSelector((state) => state.files.currentDir);
  console.log(file)

  function openFolder() {
    dispatch(pushToStack(currentDir));
    dispatch(setCurrentDir(file._id)); 
  }
  return (
    <div className={style.file}
     onClick={file.type==='dir' ? openFolder : ()=> alert('The file cannot be opened')}>
      <img src={file.type === "dir" ? folderLogo : fileLogo} alt="" />
      <div>{file.name}</div>
      <div>{file.date.slice(0, 10)}</div>
      <div>{file.size}</div>
    </div>
  );
}

export default File;
