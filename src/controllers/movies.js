const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const filters = {
    greaterThan: "gt",
    lessThan: "lt",
  };

  const { runtimeMins, comparison } = req.query;
  const whereData = {};

  if (runtimeMins && comparison) {
    const filter = {};
    const prismaOperator = filters[comparison];
    filter[prismaOperator] = Number(runtimeMins);
    whereData.runtimeMins = filter;
  }

  const title = req.query.title;

  const movies = await prisma.movie.findMany({
    where: whereData,
    include: {
      screenings: true,
    },
  });

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const { screenings } = req.body;
  const { runtimeMins, comparison } = req.query;

  const movieData = {
    title: req.body.title,
    runtimeMins: Number(req.body.runtimeMins),
  };

  if (screenings) {
    movieData.screenings = {create: screenings}

  const movie = await prisma.movie.create({
    data: movieData,
  });

  res.json({ data: movie });
};

const getMovie = async (req, res) => {
  const id = Number(req.params.id);

  const movie = await prisma.movie.findUnique({
    where: {
      id: id,
    },
  });
  if (!movie) {
    return res
      .status(404)
      .json({ error: `hey dumbass you entered the wrong id: ${id}` });
  }
  res.json({ data: movie });
};

module.exports = {
  getMovies,
  createMovie,
  getMovie,
};
