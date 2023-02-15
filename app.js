require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// COnnection to DB
const connectDB = require("./connectionDB/connection");

// import error handler
const errorHandler = require("./middlewares/errorHandler");

// Import Routers
const authRouter = require("./routers/auth");
const userRouter = require("./routers/user");
const artisanRouter = require("./routers/artisan");
const app = express();
// app.use(cors());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Artisan API");
});

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/artisan", artisanRouter);

app.use(errorHandler);

const port = 5000 || process.env.PORT;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};
start();
