import request from '../utils/request';
import { stringify } from 'querystring'

export function query() {
  return request('/api/users');
}

export function getAllModule(payload) {
  return request(`/api/moduleConfig/getAllModule?${stringify(payload)}`);
}

export function getAllSys(payload) {
  return request(`/api/sysConfig/getAllSys?${stringify(payload)}`);
}

export function getAllSysWhenInit(payload) {
  return request(`/api/sysConfig/getAllSysWhenInit?${stringify(payload)}`);
}

export function saveModuleConfig(payload) {
  return request(`/api/moduleConfig/saveModuleConfig?${stringify(payload)}`);
}

export function deleteById(payload) {
  return request(`/api/moduleConfig/deleteById/${payload}`, { method: 'DELETE' });
}

export function updateById(payload) {
  return request(`/api/moduleConfig/updateById?${stringify(payload)}`);
}