import request from '../utils/request';
import { stringify } from 'querystring'

export function getAllUser(payload) {
  return request(`/api/userConfig/getAllUser?${stringify(payload)}`);
}

export function saveUserConfig(payload) {
  window.localStorage.setItem("tokenName", payload.name);
  return request(`/api/userConfig/saveUserConfig`, { method: "POST", body: payload });
}

export function deleteById(payload) {
  return request(`/api/userConfig/deleteById/${payload}`, { method: 'DELETE' });
}

export function updateById(payload) {
  return request(`/api/userConfig/updateById?${stringify(payload)}`);
}