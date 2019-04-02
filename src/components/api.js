import axios from 'axios';
const BASE_URL = 'https://nc-knews-server-main.herokuapp.com/api'

const fetchArticles = (path) => {
    if (path === undefined) path = '';
    return axios.get(`${BASE_URL}/articles${path}`).then(res => {
        console.log(res.data.articles)
        return res.data.articles;
    });
};

export const fetchArticle = (id) => {
    if (id === undefined) id = '';
    return axios.get('https://nc-knews-server-main.herokuapp.com/api/articles/7').then(res => {
        console.log(res.data)
        return res;
    });
};

export default fetchArticles;
