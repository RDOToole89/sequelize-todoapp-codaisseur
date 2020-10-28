const express = require("express");
const usersRouter = require("./routers/usersRouter");
const todoListsRouter = require("./routers/todoListsRouter");
const app = express();

// MIDDLEWARE WILL BE RUN FOR EACH REQUEST
const loggingMiddleWare = (req, res, next) => {
  console.log(`request received at: ${new Date()}`);
  next();
};

// Middlewares

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
// parse application/json
app.use(express.json());
app.use(loggingMiddleWare);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.post("/echo", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// Routers
app.use("/users", usersRouter);
app.use("/todoLists", todoListsRouter);

const PORT = 4000;

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}.`);
});
