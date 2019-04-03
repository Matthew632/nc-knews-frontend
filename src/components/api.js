import axios from "axios";
const BASE_URL = "https://nc-knews-server-main.herokuapp.com/api";

export const fetchData = path => {
  if (path === undefined) path = "";
  return axios.get(`${BASE_URL}${path}`).then(res => {
    return res.data;
  });
};

export const getArticles = path => {
  if (path === undefined) path = "";
  return axios.get(`${BASE_URL}/articles?${path}`).then(res => {
    return res.data;
  });
};

export const patchVote = id => {
  return axios.patch(`${BASE_URL}${id}`, { inc_votes: 1 }).then(res => {
    console.log(res);
    return res.data;
  });
};

export const postComment = (id, comment) => {
  return axios
    .post(`${BASE_URL}/articles/${id}/comments`, comment)
    .then(res => {
      console.log("post function");
      return res.data;
    });
};
