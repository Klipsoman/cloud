import axios from "axios";
import { setUser } from "../reducers/userReducer";

export const registartionApi = async (email, password) => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/registration",
      {
        email,
        password,
      }
    );
    alert(res.data.message)
  } catch (error) {
    alert(error.response.data.message);
  }
};


  export const loginApi = (email, password) => async dispatch => {
    try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );
        localStorage.setItem("token", res.data.token)
        dispatch(setUser(res.data))    
      } catch (error) {
        alert(error);
      }
}

export const authApi = () => async dispatch => {
    try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/auth", {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
        localStorage.setItem("token", res.data.token)
        dispatch(setUser(res.data))      
      } catch (error) {
        alert(error);
        localStorage.removeItem("token")
      }
}

export const uploadAvatarApi = (file) => async dispatch => {
  try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post(
        "http://localhost:5000/api/files/avatar", formData, 
        {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
      ); 
      dispatch(setUser(res.data))    
    } catch (error) {
      alert(error);
    }
}

export const deleteAvatarApi = () => async dispatch => {
  try {
      const res = await axios.delete(
        "http://localhost:5000/api/files/delete", 
        {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
      ); 
      dispatch(setUser(res.data))        
    } catch (error) {
      alert(error);
    }
}


