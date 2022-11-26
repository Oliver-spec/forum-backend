const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  return res.status(500).send(`<h1>${err}</h1>`);
};

module.exports = errorHandler;
