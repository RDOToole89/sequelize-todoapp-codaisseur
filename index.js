const express = require("express");
const app = express();
const User = require("./models").user;
const TodoList = require("./models").todoList;
const bodyParser = require("body-parser");

// MIDDLEWARE WILL BE RUN FOR EACH REQUES
const loggingMiddleWare = (req, res, next) => {
  console.log(`request received at: ${new Date()}`);
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(loggingMiddleWare);

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.post("/echo", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.get("/users", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

app.post("/users", async (req, res, next) => {
  try {
    const email = req.body.email;
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).send("No user found");
    }
    res.json(user);
  } catch (e) {
    next(e);
  }
});

app.put("/users/:userId", async (req, res, next) => {
  console.log(req.body);
  const { name, email, phone } = req.body;

  try {
    const userId = parseInt(req.params.userId);
    console.log(userId);
    const userToUpdate = await User.findByPk(userId);
    if (!userToUpdate) {
      return res.status(404).send("User to UPDATE not found");
    }

    const updatedUser = await userToUpdate.update({ name, email, phone });
    res.json(updatedUser);
  } catch (e) {
    next(e);
  }
});

app.get("/users/:userId/todoLists", async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId, { include: [TodoList] });
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json(user.todoLists);
  } catch (e) {
    next(e);
  }
});

app.post("/users/:userId/todoLists", async (req, res, next) => {
  const userId = req.params.userId;
  const { name } = req.body;

  try {
    const user = await User.findByPk(userId, { include: [TodoList] });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const userWithAddedList = await TodoList.create({ userId, name });
    res.json(userWithAddedList);
  } catch (e) {
    next(e);
  }
});

// ROUTE TO SEARCH LIST BY USERID AND LIST NAME
app.get("/users/:userId/todoLists/:todoListName", async (req, res, next) => {
  const userId = req.params.userId;
  const todoListName = req.params.todoListName;
  console.log(todoListName);

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const list = await TodoList.findOne({ where: { name: todoListName } });
    if (!list) {
      return res.status(404).send("List not found");
    }

    res.json(list);
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:userId/todoLists/", async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const allLists = await TodoList.destroy({ where: { userId: userId } });
    console.log(allLists);

    res.json(allLists);
  } catch (e) {
    next(e);
  }
});

app.delete("/users/:userId/todoLists/:todoListId", async (req, res, next) => {
  const userId = req.params.userId;
  const todoListId = req.params.todoListId;
  console.log("USERID PARAM", userId);
  console.log("TODOLISTID PARAM", todoListId);

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const todoListToDelete = await TodoList.findOne({ where: { id: todoListId } });
    if (!todoListToDelete) {
      return res.status(404).send("Todolist not found");
    }
    await todoListToDelete.destroy();

    res.status(204).send("Todolist succesfully deleted");
  } catch (e) {
    next(e);
  }
});

app.get("/todoLists", async (req, res, next) => {
  try {
    const todoLists = await TodoList.findAll();

    if (!todoLists) {
      return res.status(500).send("Data could not be found");
    }
    res.json(todoLists);
  } catch (e) {
    next(e);
  }
});

app.post("/todoLists", async (req, res, next) => {
  const { name, userId } = req.body;

  try {
    if (!name || !userId) {
      return res.status(400).send("No name and userId specified");
    }
    const newTodoList = await TodoList.create({ name, userId });
    res.json(newTodoList);
  } catch (e) {
    next(e);
  }
});

app.get("/todoLists/:todoListId", async (req, res, next) => {
  const listId = req.params.todoListId;
  console.log(listId);

  try {
    const todoList = await TodoList.findByPk(listId);
    if (!todoList) {
      return res.status(404).send("Requested list not found");
    }
    res.json(todoList);
  } catch (e) {
    next(e);
  }
});

app.patch("/todoLists/:todoListId", async (req, res, next) => {
  const { name, userId } = req.body;
  const listId = req.params.todoListId;
  console.log(listId);

  try {
    const todoListToUpdate = await TodoList.findByPk(listId);
    if (!todoList) {
      return res.status(404).send("Requested list not found");
    }

    const updatedList = await todoListToUpdate.update({ name, userId });
    res.json(updatedList);
  } catch (e) {
    next(e);
  }
});

app.delete("/todoLists/:todoListId", async (req, res, next) => {
  const listId = req.params.todoListId;
  console.log(req.params);

  try {
    const todoListToDestroy = await TodoList.findByPk(listId);
    if (!todoListToDestroy) {
      res.status(404).send("Todolist to remove not found");
    }

    const destroyedTodoList = await todoListToDestroy.destroy();

    res.json(`${destroyedTodoList} has been removed`);
  } catch (e) {
    next(e);
  }
});

const PORT = 4000;

app.listen(PORT, (req, res) => {
  console.log(`Server listening on port ${PORT}.`);
});
