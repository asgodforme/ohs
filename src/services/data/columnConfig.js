import request from '../../utils/request';
import { stringify } from 'querystring'

export function getAllColumn(payload) {
  return request(`/api/columnConfig/getAllColumn?${stringify(payload)}`);
}

export function saveColumnConfig(payload) {
  return request(`/api/columnConfig/saveColumnConfig?${stringify(payload)}`);
}

export function deleteById(payload) {
  return request(`/api/columnConfig/deleteById/${payload}`, { method: 'DELETE' });
}

export function updateById(payload) {
  return request(`/api/columnConfig/updateById?${stringify(payload)}`);
}