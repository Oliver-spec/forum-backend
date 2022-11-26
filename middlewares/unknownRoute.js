const unknownRoute = (req, res, next) => {
  return res.status(404).send("<h1>ERROR 404 Route Unknown</h1>");
};

module.exports = unknownRoute;
