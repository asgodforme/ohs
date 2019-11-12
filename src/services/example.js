import request from '../utils/request';
import { stringify } from 'querystring'

export function query() {
  return request('/api/users');
}

export function getAllMenu() {
  return request('/api/menu/getAllMenu');
}

export function getUser() {
  return request('/api/userConfig/getUser');
}

export function getAllSys(payload) {
  return request(`/api/sysConfig/getAllSys?${stringify(payload)}`);
}

// export function saveSysConfig(payload) {
//   return request(`/api/sysConfig/saveSysConfig?${stringify(payload)}`);
// }

export function saveSysConfig(payload) {
  return request(`/api/sysConfig/saveSysConfig?`, {method: 'POST', body: payload});
}

export function deleteById(payload) {
  return request(`/api/sysConfig/deleteById/${payload}`, { method: 'DELETE' });
}

// export function updateById(payload) {
//   return request(`/api/sysConfig/updateById?${stringify(payload)}`);
// }

export function updateById(payload) {
  return request(`/api/sysConfig/updateById`, {method: 'PUT', body: payload});
}