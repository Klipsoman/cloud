import React from "react";
import { useSelector } from "react-redux";
import style from "./FileList.module.css";
import File from "./File/File";

function FileList() {
  let files = useSelector((state) => state.files.files);
  files = files.map((file, i) => {
    return <File file={file} key={i} />;
  });
if(files.length === 0) return <div className={style.center}>файлы не найдены</div>
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

export default FileList;
