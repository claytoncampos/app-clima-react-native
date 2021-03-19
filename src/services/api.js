import axios from 'axios';

//https://api.hgbrasil.com/weather?key=2f37ea1c&lat=-23.682&lon=-46.875

export const key = '2f37ea1c';

const api = axios.create({
  baseURL: 'https://api.hgbrasil.com',
});

export default api;
