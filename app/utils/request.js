/**
 * Request utils
 */

const GRAPHQL_URL = 'http://localhost:3000/graphql';

/**
 * Parses the the response using the content provided in the content-type header
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}
 */
function parseResponse(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const contentType = response.headers.get('content-type');
  if (contentType.indexOf('text/plain') !== -1) {
    return response.text();
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseResponse);
}

/**
 * Requests the GraphQL endpoint returning a promise
 *
 * @param {string} query     The GraphQL query string
 * @param {object} variables The variables
 *
 * @return {object}          The response data
 */
export function graphql(query, variables = null) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query.loc.source.body,
      variables,
    }),
  };

  return request(GRAPHQL_URL, options);
}
