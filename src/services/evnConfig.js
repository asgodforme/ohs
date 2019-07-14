import request from '../utils/request';
import { stringify } from 'querystring'

export function getAllEvn(payload) {
  return request(`/api/evnConfig/getAllEvn?${stringify(payload)}`);
}

// export function saveEvnConfig(payload) {
//   return request(`/api/evnConfig/saveEvnConfig?${stringify(payload)}`);
// }

export function saveEvnConfig(payload) {
  return request(`/api/evnConfig/saveEvnConfig`, { method: 'POST', body: payload });
}

export function deleteById(payload) {
  return request(`/api/evnConfig/deleteById/${payload}`, { method: 'DELETE' });
}

// export function updateById(payload) {
//   return request(`/api/evnConfig/updateById?${stringify(payload)}`);
// }

export function updateById(payload) {
  return request(`/api/evnConfig/updateById`, { method: 'PUT', body: payload });
}