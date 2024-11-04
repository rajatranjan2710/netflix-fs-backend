import fetchFromTMDB from "../utils/fetchFromTMDB.js";

export const getrandomtv = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc"
    );

    // console.log(data);
    const random = Math.floor(Math.random() * 10);
    // console.log(random);
    const randomMovie = data.results[random];

    res.status(200).json({
      success: true,
      message: "Tv show fetched succesfully",
      content: randomMovie,
    });
  } catch (error) {
    console.error("Error in getRandomTv controller");
    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};

export const getTrailersOfTv = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    // console.log(data);
    res.status(200).json({
      success: true,
      message: "Here is the trailer of tv show",
      trailer: data,
    });
  } catch (error) {
    console.log("error in GetTv trailer  controller");
    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};

export const getTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    // console.log(data);
    res.status(200).json({
      success: true,
      message: "Here  are the tv show details",
      details: data,
    });
  } catch (error) {
    console.log("error in GetTv Details controller");
    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};

export const getTvByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );

    // console.log(data);
    res.status(200).json({
      success: true,
      message: "Here are the movies by category",
      content: data.results,
    });
  } catch (error) {
    console.log("error in GetMovie Details controller");
    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};

export const getSimilarTvShows = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );

    // console.log(data);
    res.status(200).json({
      success: true,
      message: "Here are the similar tv shows",
      similar: data,
    });
  } catch (error) {
    console.log("error in Ge Similar tv shows controller");
    res.status(500).json({
      success: false,
      message: "Some internal error",
    });
  }
};
