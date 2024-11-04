import { user } from "../models/user.model.js";
import fetchFromTMDB from "../utils/fetchFromTMDB.js";

export const searchPerson = async (req, res) => {
  console.log("hiiting");
  const { query } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    // console.warn(data.response.status);
    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await user.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          name: data.results[0].name,
          searchType: "Person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Person found",
      content: data.results,
    });
  } catch (error) {
    console.error("Error in search person controller ", error.message);
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const searchMovie = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await user.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          name: data.results[0].title,
          searchType: "Movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Movie found",
      content: data.results,
    });
  } catch (error) {
    console.error("Error in search movie controller");
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const searchTvShow = async (req, res) => {
  const { query } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).send(null);
    }

    await user.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          name: data.results[0].name,
          searchType: "Person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Tv Show found",
      content: data.results,
    });
  } catch (error) {
    console.error("Error in search tv controller");
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getHistory = async (req, res) => {
  try {
    const user = req.user;
    const history = user.searchHistory;

    res.status(200).json({
      success: true,
      message: "History retrived",
      History: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};

export const deleteHistory = async (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  try {
    await user.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: {
          id: id,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "History deleted",
    });
  } catch (error) {
    console.error("Error in delete history controller");
    res.status(500).json({
      success: false,
      message: "Internal Server error",
    });
  }
};
