import axios from "axios";
import { addFile, deleteFile, setFiles } from "../reducers/fileReducer";
import { hideLoader, showLoader } from "../reducers/loaderReducer";
import { setFileToUpload, setPercentLoaded, uploadVisible } from "../reducers/uploadReducer";

export const getFilesApi = (dirId, sort) => async (dispatch) => {
    try {
        dispatch(showLoader())
        let url = `http://localhost:5000/api/files`
        if (dirId) {
            url = `http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`
        } 
        if(sort) {
            url = `http://localhost:5000/api/files?sort=${sort}`
        }
        if(dirId && sort) {
            url = `http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}&sort=${sort}`
        }
        const res = await axios.get(url, {
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
        })
        dispatch(setFiles(res.data))
    } catch (error) {
        alert(error.response.data.message)
    } finally {
        dispatch(hideLoader())
    }
} 

export const createFileApi = (dirId, name) => async (dispatch) => {
    try {
        const res = await axios.post(`http://localhost:5000/api/files`, {
            name,
            parent: dirId,
            type: 'dir'
        }, {
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
        })
        dispatch(addFile(res.data))
        
    } catch (error) {
        alert(error.response.data.message)
    }
} 

export const uploadFileApi = (file, dirId) => async (dispatch) => {
    try {
        const formData = new FormData()
        formData.append('file', file)
        if(dirId){
            formData.append('parent', dirId)
        }
        const res = await axios.post(`http://localhost:5000/api/files/upload`, formData, {
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")},
            onUploadProgress: progressEvent => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log('total', totalLength)
                if (totalLength) {
                    let progress = Math.round((progressEvent.loaded * 100) / totalLength)
                    console.log(progress)
                    dispatch(setPercentLoaded(progress))
                }
            }
            
        })
        dispatch(addFile(res.data))
        dispatch(uploadVisible())
        dispatch(setFileToUpload(res.data.name))
        console.log(res.data.name)
       
    } catch (error) {
        alert(error.response.data.message)
    }
} 


export const downloadFileApi = async (file) => {
    try {
        const resBlob = await axios.get(`http://localhost:5000/api/files/download?id=${file._id}`, {
            responseType: 'blob',
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
        })
        const downloadUrl = window.URL.createObjectURL(resBlob.data)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.append(link)
        link.click()  
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);      
    } catch (error) {
        alert(error)
    }
}

export const deleteFileApi = (file) => async (dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/files?id=${file._id}`, {
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
        })
        dispatch(deleteFile(file._id))
        alert(res.data.message)
    } catch (error) {
        alert(error)
    }
}