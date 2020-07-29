export const apiUrl = process.env['MIX_REACT_APP_API_URL'];

export const client = async (endpoint, { body, ...config } = {}) => {
    const headers = {
        'Content-Type': 'application/json',
        'token': '123456',
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(`${apiUrl}/${endpoint}`, {
        method: config.method || 'GET',
        headers: { ...headers, ...config.headers },
        ...config,
    });

    if (response.status === 401) {
        window.location.assign(window.location);
        return;
    }

    if (response.status === 204) {
        return;
    }

    const data = await response.json();

    if (response.ok) {
        return data;
    } else {
        return Promise.reject(data);
    }
};
