export const BASE_URL = "https://vincent-backend.camps.fahrul.id";

async function http(url, opts={}) { 
    const token = localStorage.getItem('token');
    const headers = {
        ...opts.headers
    };

    if (token) {
        headers.Authorization = "Bearer " + token;
    } else if (opts.token) {
        headers.Authorization = "Bearer " + opts.token;
    }

    const isFormData = opts.body instanceof FormData;

    if (!isFormData) {
        headers['Content-Type'] = 'application/json';
    }

    const method = opts.method || "GET";
    let finalUrl = BASE_URL + url;
    if (method !== "GET") {
        const sep = url.includes("?") ? "&" : "?";
        finalUrl += `${sep}_t=${Date.now()}`;
    }

    const response = await fetch(finalUrl, {
        method: method,
        headers: headers,
        body: opts.body ? (isFormData ? opts.body : JSON.stringify(opts.body)) : undefined,
        cache: "no-store" 
    });

    if(response.status === 401 && !url.includes('/auth/login')){
        localStorage.clear();

        alert("Your session has expired. Please log in again");
        window.location.href = "/login";
    }

    const text = await response.text();
    try{
        return JSON.parse(text)
    } catch(err){
        console.error("Server returned non-JSON response:", text);
        return {
            success: false,
            message: "Server Error: Invalid JSON response"
        };
    }
}

export default http;