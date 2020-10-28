const express = require("express");
const TodoList = require("../models").todoList;
const { Router } = express;

const router = new Router();

router.get("/", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
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

router.get("/:todoListId", async (req, res, next) => {
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

router.patch("/:todoListId", async (req, res, next) => {
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

router.delete("/:todoListId", async (req, res, next) => {
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

module.exports = router;
