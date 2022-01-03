import apiBase from "./api";


export const POST = (url, body) => {
  return apiBase.post(`${url}`, body);
}

export const GET = (url) => {
  return apiBase.get(`${url}`); 
}
