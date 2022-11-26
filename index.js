const express = require("express");
const app = express();

const cors = require("cors");

const { PORT } = require("./config");
const errorHandler = require("./middlewares/errorHandler");
const unknownRoute = require("./middlewares/unknownRoute");
const userRouter = require("./controllers/userRouter");

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);

app.use(errorHandler);
app.use(unknownRoute);

// listen to port
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
