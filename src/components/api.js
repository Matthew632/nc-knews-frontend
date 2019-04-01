import axios from 'axios';
const BASE_URL = 'https://nc-knews-server-main.herokuapp.com/api'

const fetchArticles = (path) => {
    if (path === undefined) path = '';
    return axios.get('https://nc-knews-server-main.herokuapp.com/api/articles').then(res => {
        return res.data.students;
    });
};

export default fetchArticles;

//`${BASE_URL}${path}`