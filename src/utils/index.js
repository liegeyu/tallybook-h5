import axiosIns from "./request";

export const get = axiosIns.get;

export const post = axiosIns.post;

export const parseUrl = (query_string) => {
  if (!query_string) return null;
  
  const params = query_string.split('?')[1];
  const paramsArr = params.split('&');
  const query = {};

  for (let i = 0; i < paramsArr.length; i++) {
    const queryTmp = paramsArr[i].split('=');
    const key = decodeURIComponent(queryTmp[0]);
    const value = decodeURIComponent(queryTmp[1]);
    query[key] = value;
  }

  return query;
}
