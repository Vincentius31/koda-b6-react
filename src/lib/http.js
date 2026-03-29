export const BASE_URL = "https://vincent-backend.camps.fahrul.id";

async function http(url, opts={}){ 
    const headers = {
        'Content-Type': 'application/json'
    }

    const token = localStorage.getItem('token')

    if (token) {
        headers.Authorization = "Bearer " + token;
    } else if (opts.token) {
        headers.Authorization = "Bearer " + opts.token;
    }

    const response = await fetch(BASE_URL + url, {
        method: opts.method || "GET",
        headers: headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined
    });

    return await response.json()
}

export default http;