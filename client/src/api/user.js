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
        dispatch(setUser(res.data))
        localStorage.setItem("token", res.data.token)
      } catch (error) {
        alert(error);
      }
}

export const authApi = () => async dispatch => {
    try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/auth", {headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
        );
        dispatch(setUser(res.data))
        console.log(res.data)
        localStorage.setItem("token", res.data.token)
      } catch (error) {
        alert(error);
        localStorage.removeItem("token")
      }
}
