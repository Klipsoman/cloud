import React from "react";
import { useSelector } from "react-redux";
import style from "./FileList.module.css";
import File from "./File/File";

function FileList() {
  let files = useSelector((state) => state.files.files);
  const view = useSelector(state=> state.files.view)
  files = files.map((file, i) => {
    return <File file={file} key={i} />;
  });
if(files.length === 0) return <div className={style.filesNotFound}>Files not found</div>
if(view === 'list') {
  return (
    <div className={style.filelist}>
      <div className={style.filelistHeader}>
        <div></div>
        <div>Name</div>
        <div>Date</div>
        <div>Size</div>
      </div>
      {files}
    </div>
  );
}
if(view === 'tile') {
  return (
    <div className={style.fileListTile}>
      {files}
    </div>
  )
}
  
}

export default FileList;
