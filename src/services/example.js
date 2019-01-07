import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function getAllMenu() {
  return request('/api/menu/getAllMenu');
}
