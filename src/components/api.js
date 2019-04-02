import axios from 'axios';
const BASE_URL = 'https://nc-knews-server-main.herokuapp.com/api'

export const fetchData = (path) => {
    if (path === undefined) path = '';
    return axios.get(`${BASE_URL}${path}`).then(res => {
        return res.data;
    });
};

export const postVote = (id) => {
    return axios.patch(`${BASE_URL}${id}`, { inc_votes: 1 }).then(res => {
        console.log(res);
        return res.data;
    });
};


