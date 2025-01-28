import axios, { AxiosInstance } from "axios";

const createHttpClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });

  client.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response) {
        return Promise.reject({
          type: "api",
          message: error.response.data.error
            .map((item: Record<string, unknown>) => item.msg)
            .join(", "),
        });
      } else if (error.request) {
        return Promise.reject({
          type: "network",
          message: "Network error: Unable to reach the server",
        });
      } else {
        return Promise.reject({
          type: "unknown",
          message: error.message || "Unexpected error occurred",
        });
      }
    }
  );

  return client;
};

const httpClient = createHttpClient();

export default httpClient;
