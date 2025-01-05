import axios from "axios";



export const postSignin = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_AUTH_API_URI}/users/login`, data );
      return response;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };




  export const postSignup = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_AUTH_API_URI}/users/`, data );
      return response;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };


  export const postCreateEvent = async (token, data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_EVENT_API_URI}/event`,
        data, 
        {
          headers: {
            Authorization: "Bearer " + token,
            'Content-Type': 'application/json',
          }
        }
      );
      return response;
    } catch (error) {
      console.error('Error posting user details:', error);
      throw error;
    }
  };



  export const postCheckAuth = async (token) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_API_URI}/users/verify`,
        {}, 
        {
          headers: {
            Authorization:  "Bearer " + token,
            'Content-Type': 'application/json',
          }
        }
      );
      return response;
    } catch (error) {
      console.error('Error posting user details:', error);
      throw error;
    }
  };