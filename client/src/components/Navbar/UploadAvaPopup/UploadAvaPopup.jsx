import React, { useState } from "react";
import style from "./UploadAvaPopup.module.css"
import { useDispatch, useSelector } from "react-redux";
import { deleteAvatarApi, uploadAvatarApi } from "../../../api/user";

function UploadAvaPopup(props) {
    const dispatch = useDispatch()
    const avatar = useSelector(state=>state.user.currentUser.avatar)
    const [file, setFile] = useState(null)

    function closePopup(){
        props.closePopup(true)
    }

    function chooseAvaHandler(e){
        const file = e.target.files[0]
        console.log(file)
        setFile(file)
    }

    function uploadAvaHandler(){
        if(!file) return
        dispatch(uploadAvatarApi(file))
    }

    function deleteAvaHandler(){
        if(!avatar) return
        dispatch(deleteAvatarApi())
    }
  
    return (
    <div className={style.popupWrapper} onClick={closePopup}>
        <div className={style.popupBody} onClick={(e)=>e.stopPropagation()}>
            <div>Avatar settings</div>
            <div><input type="file" placeholder="choose youe avatar" accept="image/*" onChange={chooseAvaHandler}/></div>
            <div><button onClick={uploadAvaHandler}>Upload</button></div>
            <div><button onClick={deleteAvaHandler}>Delete</button></div>  
            <div className={style.popupClose} onClick={closePopup}>X</div>   
        </div>   
    </div>
  );
}

export default UploadAvaPopup;
