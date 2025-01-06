import axios from 'axios';

const api = axios.create({
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// async function apiGet(url:string) {
//   const res = await fetch(url, {
//     credentials: 'include'

//   });
// }

export default api;