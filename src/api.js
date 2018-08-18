import store from '@/store';

const call = async (method, endpoint, body, onSuccess) => {
  const { state: { token } } = store();
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: token,
  };

  try {
    const response = await fetch(`${process.env.VUE_APP_API_URL}${endpoint}`, {
      headers,
      method,
      ...(body ? { body } : {}), // Only add body if it exists
    });

    if (onSuccess && response.status === 200) {
      onSuccess();
    }
  } catch (e) { console.log(e); }
};

export default {
  post(endpoint, body, onSuccess) {
    call('POST', endpoint, body, onSuccess);
  },

  patch(endpoint, body, onSuccess) {
    call('PATCH', endpoint, body, onSuccess);
  },

  delete(endpoint, onSuccess) {
    call('DELETE', endpoint, null, onSuccess);
  },
};
