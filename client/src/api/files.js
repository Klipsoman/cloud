import axios from "axios";
import { addFile, setFiles } from "../reducers/fileReducer";

export const getFilesApi = (dirId) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:5000/api/files${dirId ? '?parent=' + dirId : ''}`, {
            headers: {Authorization: 'Bearer ' + localStorage.getItem("token")}
        })
        dispatch(setFiles(res.data))
        console.log(res.data)
    } catch (error) {
        alert(error.response.data.message)
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
                }
            }
            
        })
        dispatch(addFile(res.data))
       
    } catch (error) {
        alert(error.response.data.message)
    }
} 


export const downloadFileApi = async (file) => {
    try {
        
    } catch (error) {
        alert(error.response.data.message)
    }
}