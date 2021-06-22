import axios from "axios";

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
