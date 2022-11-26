const validateUser = (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).send("Username or password missing");
      return;
    }

    if (username.length < 3) {
      res.status(400).send("Username must contain at least 3 letters");
      return;
    }

    if (username.length > 20) {
      res.status(400).send("Username must not exceed 12 letters");
      return;
    }

    if (password.length < 8) {
      res.status(400).send("Password must be at least 8 letters long");
      return;
    }

    if (password.length > 20) {
      res.status(400).send("Password must not exceed 20 letters");
      return;
    }

    if (username.match(/[^A-Za-z0-9_]/g)) {
      res
        .status(400)
        .send("Username must only contain letters, numbers and underscore");
      return;
    }

    if (password.match(/[^A-Za-z0-9]/g)) {
      res.status(400).send("Password must only contain letters and numbers");
      return;
    }

    if (
      !password.match(/[A-Z]/g) ||
      !password.match(/[a-z]/g) ||
      !password.match(/[0-9]/g)
    ) {
      res
        .status(400)
        .send(
          "Password must contain uppercasce and lowercase letters and numbers"
        );
      return;
    }

    return next();
  } catch (err) {
    return next(err);
  }
};

module.exports = validateUser;
