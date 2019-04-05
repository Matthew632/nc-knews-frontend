import axios from "axios";
const BASE_URL = "https://nc-knews-server-main.herokuapp.com/api";

export const fetchData = path => {
  if (path === undefined) path = "";
  return axios.get(`${BASE_URL}${path}`).then(res => {
    return res.data;
  });
};

export const fetchArticles = (topic, p, sort_by, author) => {
  return axios
    .get(`${BASE_URL}/articles`, {
      params: {
        topic,
        p,
        sort_by,
        author
      }
    })
    .then(res => {
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

export const postArticle = article => {
  return axios.post(`${BASE_URL}/articles`, article).then(res => {
    console.log(res);
    return res;
  });
};

export const postTopic = topic => {
  return axios.post(`${BASE_URL}/topics`, topic).then(res => {
    console.log("in post topic function");
    return res.data;
  });
};

export const deleteArticle = id => {
  return axios.delete(`${BASE_URL}/articles/${id}`).then(res => {
    console.log(res);
    return res;
  });
};

export const deleteComment = id => {
  return axios.delete(`${BASE_URL}/comments/${id}`).then(res => {
    console.log(res);
    return res;
  });
};
