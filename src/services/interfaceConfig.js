import request from '../utils/request';
import { stringify } from 'querystring'

export function getAllInterface(payload) {
  return request(`/api/interfaceConfig/getAllInterface?${stringify(payload)}`);
}

// export function saveInterfaceConfig(payload) {
//   return request(`/api/interfaceConfig/saveInterfaceConfig?${stringify(payload)}`);
// }

export function saveInterfaceConfig(payload) {
  return request(`/api/interfaceConfig/saveInterfaceConfig`, { method: "POST", body: payload });
}


export function deleteById(payload) {
  return request(`/api/interfaceConfig/deleteById/${payload}`, { method: 'DELETE' });
}

// export function updateById(payload) {
//   return request(`/api/interfaceConfig/updateById?${stringify(payload)}`);
// }

export function updateById(payload) {
  return request(`/api/interfaceConfig/updateById`, { method: "PUT", body: payload });
}

export function saveInterfaceSingleRecords(payload) {
  return request(`/api/interfaceSingleRecords/saveInterfaceSingleRecords`, { method: "POST", body: payload });
}