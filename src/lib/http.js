const BASE_URL = "https://vincent-backend.camps.fahrul.id"

export default async function http(endpoint, { method = "GET", body, token } = {}) {
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, config);

        if (response.status === 401) {
            console.warn("Token expired atau tidak valid. Melakukan auto-logout...");
            
            localStorage.removeItem("token");
            localStorage.removeItem("user_email");
            
            alert("Sesi Anda telah berakhir. Silakan login kembali.");
            
            window.location.href = "/login";

            return null; 
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("HTTP Fetch Error:", error);
        throw error;
    }
}