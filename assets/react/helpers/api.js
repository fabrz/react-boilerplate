import axios from 'axios';

function makeRequest(type, urlParam, data) {
  const config = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/vnd.api+json',
      Authorization: '',
    },
  };
  switch (type) {
    case 'GET':
      return axios.get(
        urlParam,
        config,
      );
    case 'POST':
      return axios.post(
        urlParam,
        data,
        config,
      );
    case 'PATCH':
      return axios.patch(
        urlParam,
        data,
        config,
      );
    default:
      return null;
  }
}
