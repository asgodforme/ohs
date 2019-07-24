import request from '../utils/request';
import { stringify } from 'querystring'

export function getAllTestsuit(payload) {
  return request(`/api/testsuitConfig/getAllTestsuit?${stringify(payload)}`);
}

// export function saveTestsuitConfig(payload) {
//   return request(`/api/testsuitConfig/saveTestsuitConfig?${stringify(payload)}`);
// }

export function saveTestsuitConfig(payload) {
  return request(`/api/testsuitConfig/saveTestsuitConfig`, { method: "POST", body: payload });
}

export function saveTestsuitRecords(payload) {
  return request(`/api/testsuitRecordsConfig/saveTestsuitRecords`, { method: "POST", body: payload });
}

export function deleteById(payload) {
  return request(`/api/testsuitConfig/deleteById/${payload}`, { method: 'DELETE' });
}

export function deleteRecordsById(payload) {
  return request(`/api/testsuitRecordsConfig/deleteById/${payload}`, { method: 'DELETE' });
}

// export function updateById(payload) {
//   return request(`/api/testsuitConfig/updateById?${stringify(payload)}`);
// }

export function updateById(payload) {
  return request(`/api/testsuitConfig/updateById`, { method: "PUT", body: payload });
}