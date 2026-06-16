import axios from "axios";
import handleRandomToken from "../utils/handleRandomToken";
import { Settings } from "../api";
import handleJSEncrypt from "../utils/handleJSEncrypt";
import { getSiteURL } from "../utils/getSiteURL";

export const AxiosJSEncrypt = axios.create({
  baseURL: "",
});

// Add a request interceptor
AxiosJSEncrypt.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config?.method === "post") {
      const generatedToken = handleRandomToken();

      let payload = {
        ...config.data,
        token: generatedToken,
      };

      const { siteURL } = getSiteURL();

      if (siteURL) {
        payload.site = siteURL;
      }

      if (Settings.language) {
        payload.language = localStorage.getItem("language") || "english";
      }

      const encryptedData = handleJSEncrypt(payload);

      config.data = encryptedData;
    }
    return config;
  },
  async function (error) {
    // Do something with request error

    return Promise.reject(error);
  },
);

// Add a response interceptor
AxiosJSEncrypt.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);
