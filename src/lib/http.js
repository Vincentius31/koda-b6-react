const BASE_URL = "https://vincent-backend.camps.fahrul.id"

function http(url, opts={}){
    const headers = {
        'Content-Type': 'application/json',
    }
    if(opts.token){
        headers.Authorization = "Bearer" + opts.token
    }
    return fetch(BASE_URL + url, {
        method: opts.method || "GET",
        headers: headers,
        body: opts.body ? JSON.stringify(opts.body) : undefined,
    })
    return Response.json()
}

export default http;