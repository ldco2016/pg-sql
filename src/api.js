import axios from "axios";

const URL =
  process.env.NODE_ENV === "production"
    ? "https://api.pg-sql.com"
    : "http://localhost:3001";

const post = async (...args) => {
  try {
    const { data } = await axios.post.apply(null, args);

    return { queryResults: data, error: null };
  } catch (error) {
    return {
      data: [],
      error: err.isAxiosError
        ? err.response && err.response.data.error
        : err.message,
    };
  }
};

export default {
  resetInstance() {
    return post(
      `${URL}/reset`,
      {},
      {
        withCredentials: true,
      }
    );
  },
  provisionInstance() {
    return post(
      `${URL}/provision`,
      {},
      {
        withCredentials: true,
      }
    );
  },
  runQuery(query) {
    return post(
      `${URL}/query`,
      { query },
      {
        withCredentials: true,
      }
    );
  },
};
