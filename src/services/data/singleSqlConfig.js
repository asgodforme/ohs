import request from '../../utils/request';
import { stringify } from 'querystring'

export function getAllSingleSql(payload) {
  return request(`/api/singleSqlConfig/getAllSingleSql?${stringify(payload)}`);
}

export function saveSingleSqlConfig(payload) {
  return request(`/api/singleSqlConfig/saveSingleSqlConfig?${stringify(payload)}`);
}

export function deleteById(payload) {
  return request(`/api/singleSqlConfig/deleteById/${payload}`, { method: 'DELETE' });
}

export function updateById(payload) {
  return request(`/api/singleSqlConfig/updateById?${stringify(payload)}`);
}