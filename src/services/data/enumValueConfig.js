import request from '../../utils/request';
import { stringify } from 'querystring'

export function getAllEnumValue(payload) {
  return request(`/api/enumValueConfig/getAllEnumValue?${stringify(payload)}`);
}

export function saveEnumValueConfig(payload) {
  return request(`/api/enumValueConfig/saveEnumValueConfig?${stringify(payload)}`);
}

export function deleteById(payload) {
  return request(`/api/enumValueConfig/deleteById/${payload}`, { method: 'DELETE' });
}

export function updateById(payload) {
  return request(`/api/enumValueConfig/updateById?${stringify(payload)}`);
}