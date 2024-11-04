import fetchFromTMDB from "../utils/fetchFromTMDB.js";
// import

export const getRandomMovies = async (req, res) => {
  // console.log("Hitting get movies");

  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
    );

    // console.log(data.results);

    const random = Math.floor(Math.random() * 10);
    // console.log(random);
    const randomMovie = data.results[random];
    // console.warn("random movie :", randomMovie)

    res.status(200).json({
      success: true,
      message: "Movies fetched successfully",
      content: randomMovie,
    });
  } catch (error) {
    console.error("error in movie controller", error.message);
    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    // console.log(data);
    res.status(200).json({
      success: true,
      message: "Here  are the movie details",
      details: data,
    });
  } catch (error) {
    console.log("error in GetMovie Details controller");
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};

export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );

    // console.log(data);
    res.status(200).json({
      success: true,
      message: "Here are the similar movies",
      similar: data,
    });
  } catch (error) {
    console.log("error in Ge Similar movies controller");
    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};

export const getMoviesbyCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );

    // console.log(data);
    res.status(200).json({
      success: true,
      message: "Here are the movies by category",
      content: data.results,
    });
  } catch (error) {
    console.log("error in GetMovie Details controller", error.message);
    console.log(error.message);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};

export const getTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    // console.log(data);
    console.log("delivered trailer");

    res.status(200).json({
      success: true,
      message: "Here is the trailer",
      trailers: data,
    });
  } catch (error) {
    console.log("error in GetMovie Details controller");
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};
