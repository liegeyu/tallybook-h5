import axiosIns from "./request";
import { baseUrl } from "config";

const MODE = import.meta.env.MODE;

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

export const imgUrlTrans = (url) => {
  if (url && url.startsWith('http')) {
    return url
  } else {
    url = `${MODE == 'development' ? 'http://8.134.112.129:5573' : baseUrl}${url}`
    return url
  }
}
