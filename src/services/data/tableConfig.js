import request from '../../utils/request';
import { stringify } from 'querystring'

export function getAllTable(payload) {
  return request(`/api/tableConfig/getAllTable?${stringify(payload)}`);
}

// export function saveTableConfig(payload) {
//   return request(`/api/tableConfig/saveTableConfig?${stringify(payload)}`);
// }

export function saveTableConfig(payload) {
  return request(`/api/tableConfig/saveTableConfig`, { method: 'POST', body: payload });
}

export function deleteById(payload) {
  return request(`/api/tableConfig/deleteById/${payload}`, { method: 'DELETE' });
}

export function updateById(payload) {
  return request(`/api/tableConfig/updateById?${stringify(payload)}`);
}