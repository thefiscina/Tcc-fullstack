import axios from 'axios';

const apiBase = axios.create({
  baseURL: 'https://api-cartoes.bairrista.com.br/api/App/',
});

export default apiBase;
 