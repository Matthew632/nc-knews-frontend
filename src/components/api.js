import axios from 'axios';
const BASE_URL = 'https://nc-knews-server-main.herokuapp.com/api'

export const fetchData = (path) => {
    if (path === undefined) path = '';
    return axios.get(`${BASE_URL}${path}`).then(res => {
        return res.data;
    });
};


