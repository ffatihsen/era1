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
      throw error;
    }
  };


  export const getEvents = async (token,date,searchkey) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_EVENT_API_URI}/event/?date=${date}&searchkey=${searchkey}`, 
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };


  export const getEventById = async (token,id,newPage) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_EVENT_API_URI}/event/${id}?page=${newPage}&limit=${6}`, 
        {
          headers: {
            Authorization: "Bearer " + token,
          }
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error; 
    }
  };


  export const postJoinEvent = async (token, eventId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_EVENT_API_URI}/event/${eventId}/participants`,
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
      console.error(error);
      throw error;
    }
  };


  export const postAddComment = async (token, eventId, comment) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_EVENT_API_URI}/event/${eventId}/comments`,
        comment, 
        {
          headers: {
            Authorization:  "Bearer " + token,
            'Content-Type': 'application/json',
          }
        }
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };