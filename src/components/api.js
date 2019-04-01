import axios from 'axios';
const BASE_URL = 'https://nc-knews-server-main.herokuapp.com/api'

const fetchArticles = (path) => {
    if (path === undefined) path = '';
    return axios.get(`${BASE_URL}${path}`).then(res => {
        console.log(res.data.articles)
        return res.data.articles;
    });
};

export default fetchArticles;
