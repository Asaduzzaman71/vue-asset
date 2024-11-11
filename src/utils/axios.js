import axios from 'axios'
import router from '../router/index';
function createApiHandler({accessToken = true }={}) {
    let options = {
        baseURL: process.env.API_BASE_URL ?? 'http://127.0.0.1:8000/api',
        timeout: 20000
    }
    if (accessToken){
        options['headers'] = { authorization: "Bearer" + " " +  localStorage.getItem('access_token') }
    }
    let axiosInstance  = axios.create(options)
    axiosInstance.interceptors.request.use((config) => {
        if(config.formData === true){
            config.headers = { ...config.headers, ...{ "Content-Type": "multipart/form-data" }}
        }
        if (accessToken) {
            console.log("hlwwww")
            logoutIfExpireToken()
        }
        return config
    }, (error) => {
        return Promise.reject(error)
    })
    axiosInstance.interceptors.response.use(
        (response) => {
          // You can modify the response before it reaches the component
          return response;
        },
        (error) => {
          // Handle response error
          if (error.response && error.response.status === 401) {
            // Example: Redirect to login page if 401 Unauthorized
            router.push({ name: 'Login' });
          }
          return Promise.reject(error);
        }
    );
    return axiosInstance 
}

function Api({accessToken=true}={}) {
    return createApiHandler({accessToken})
}
function logoutIfExpireToken() {
    const token = localStorage.getItem('access_token'); // Get the token from cookies
    if (!token) {
        return;
    }

    try {
        console.log('Encoded Token:', token);

        // Decode the payload of the JWT manually
        const payloadBase64 = token.split('.')[1];
        const payloadDecoded = atob(payloadBase64);
        const payload = JSON.parse(payloadDecoded);
        
        // `payload.exp` contains the expiration time in seconds
        const currentTime = Math.floor(Date.now() / 1000);
        console.log('Current Time:', currentTime, 'Token Expiry:', payload.exp);

        if (payload.exp < currentTime) {
            console.log("Token has expired. Logging out.");
            logoutUser();
        } else {
            console.log("Token is still valid.");
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        logoutUser();
    }
}

function logoutUser() {
    // Clear the token (from cookies, localStorage, or any other storage)
    localStorage.removeItem('access_token');
    // Redirect the user to the login page
    router.push({ name: 'Login' });
}

export { Api }

