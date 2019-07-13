import request from '../utils/request';
import { stringify } from 'querystring'


export function getModuleBySysAlias(payload) {
  return request(`/api/moduleConfig/getModuleBySysAlias?${stringify(payload)}`);
}

export function querySubmit(payload) {
  return request(`/api/dataQuery/querySubmit`, { method: 'POST' , body: payload});
}