import store from '@/store';

const call = async (method, endpoint, body, onSuccess) => {
  const {
    state: { token },
  } = store();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const url = `${process.env.VUE_APP_API_URL}${endpoint}`;
  const response = await fetch(url, {
    headers,
    method,
    ...(body && { body }), // Only add body if it exists
  });

  if (onSuccess && response.status >= 200 && response.status < 300) {
    onSuccess();
  }

  return response;
};

export default {
  async postJson(endpoint, body, onSuccess) {
    const response = await call('POST', endpoint, body, onSuccess);
    const json = await response.json();
    return json;
  },

  async getJson(endpoint, onSuccess) {
    const response = await call('GET', endpoint, null, onSuccess);
    const json = await response.json();
    return json;
  },

  post(endpoint, body, onSuccess) {
    call('POST', endpoint, body, onSuccess);
  },

  patch(endpoint, body, onSuccess) {
    call('PATCH', endpoint, body, onSuccess);
  },

  put(endpoint, body, onSuccess) {
    call('PUT', endpoint, body, onSuccess);
  },

  delete(endpoint, onSuccess) {
    call('DELETE', endpoint, null, onSuccess);
  },
};
