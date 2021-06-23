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