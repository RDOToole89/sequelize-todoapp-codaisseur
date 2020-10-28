const express = require("express");
const User = require("../models").user;
const { Router } = express;

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
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

router.get("/:userId", async (req, res, next) => {
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

router.put("/:userId", async (req, res, next) => {
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

router.get("/:userId/todoLists", async (req, res, next) => {
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

router.post("/:userId/todoLists", async (req, res, next) => {
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
router.get("/:userId/todoLists/:todoListName", async (req, res, next) => {
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

router.delete("/:userId/todoLists/", async (req, res, next) => {
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

router.delete("/:userId/todoLists/:todoListId", async (req, res, next) => {
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

// const user = await User.findByPk(userId, { include: [TodoList] });
// // validate user, etc
// const listToDestroy = user.todoLists.find(list => list.id === todoListId)
// if(!listToDestroy) return res.status(404).send("this user does not have this list")
// await listToDestroy.destroy()

module.exports = router;
