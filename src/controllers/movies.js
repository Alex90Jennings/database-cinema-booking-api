const prisma = require("../utils/prisma");

const getMovies = async (req, res) => {
  const movies = await prisma.movie.findMany({
    include: {
      screenings: true,
    },
  });

  res.json({ data: movies });
};

const createMovie = async (req, res) => {
  const movie = await prisma.movie.create({
    data: {
      title: req.body.title,
      runtimeMins: Number(req.body.runtimeMins),
    },
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
