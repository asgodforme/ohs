import fetch from 'dva/fetch';
import { error } from '../components/module/SysCfgQueryFieldAlert';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  let new_options;
  if (options != null && (options.method === 'POST' || options.method === 'PUT')) {
    new_options = {
      method: options.method,
      body: JSON.stringify(options.body),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      }
    };
  } else {
    new_options = options;
  }
  return fetch(url, new_options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data })).catch(err => (error(err.message)));
  // .catch(err => ({ err }));
}

