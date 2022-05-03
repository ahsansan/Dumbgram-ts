import axios from "axios";

export const API = axios.create({
  baseURL: "https://dumbgram-be-ahsan.herokuapp.com/api/dumbgram/v1/",
  // baseURL: "http://localhost:5000/api/dumbgram/v1/",
});

export const setAuthToken = (token: string) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};
