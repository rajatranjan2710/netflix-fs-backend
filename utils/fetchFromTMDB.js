import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDcxMGVjNjRmN2VmMDNkZGIxODViYWEzNDZjMjRjMiIsIm5iZiI6MTcyNjkxMjYzMy45MTMzMTIsInN1YiI6IjY2ZWU5NzZhNGE3ZjBiMThiMDI1ZWVlNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8W6kKMEuvtffwx2eX8hpbqBOzZIJkx7bNb6dlWZqyCI",
  },
};

const fetchFromTMDB = async (url) => {
  console.log("hitting");
  const response = await axios.get(url, options);

  // console.log(response.status);
  if (response.status !== 200) {
    throw new Error("Failed to fetch data from tmdb ", response.statusText);
  }

  return response.data;
};

export default fetchFromTMDB;
