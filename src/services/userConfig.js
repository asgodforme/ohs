import request from '../utils/request';
import { stringify } from 'querystring'

export function getAllUser(payload) {
  return request(`/api/userConfig/getAllUser?${stringify(payload)}`);
}

export function saveUserConfig(payload) {
  return request(`/api/userConfig/saveUserConfig?${stringify(payload)}`);
}

export function deleteById(payload) {
  return request(`/api/userConfig/deleteById/${payload}`, { method: 'DELETE' });
}

export function updateById(payload) {
  return request(`/api/userConfig/updateById?${stringify(payload)}`);
}