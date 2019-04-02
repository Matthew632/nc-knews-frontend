import axios from 'axios';
const BASE_URL = 'https://nc-knews-server-main.herokuapp.com/api'

const fetchData = (path) => {
    if (path === undefined) path = '';
    return axios.get(`${BASE_URL}${path}`).then(res => {
        return res.data;
    });
};

// export const fetchArticle = (id) => {
//     if (id === undefined) id = '';
//     return axios.get('https://nc-knews-server-main.herokuapp.com/api/articles/7').then(res => {
//         console.log(res.data.article)
//         return res;
//     });
// };

export default fetchData;
