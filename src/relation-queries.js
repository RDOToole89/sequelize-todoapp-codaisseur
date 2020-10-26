const { user, todoItem, todoList } = require("../models");

async function listsWithUsers() {
  const lists = await todoList.findAll({
    include: [user],
  });

  return lists.map((list) => list.get({ plain: true }));
}

// listsWithUsers().then((lists) => console.log(lists));

async function listsWithUsers() {
  const lists = await todoList.findAll({
    include: [{ model: user, attributes: ["name"] }],
  });
  return lists.map((list) => list.get({ plain: true }));
}

async function getUsers() {
  const allUsers = await user.findAll({
    include: { model: todoList, attributes: ["name"] },
  });
  return allUsers.map((user) => user.get({ plain: true }));
}

// getUsers().then((users) => console.log(users));

async function getUserListsById() {
  try {
    const userLists = await user.findOne({ where: { id: 2 }, include: [todoList] });
    console.log("USERLISTS", userLists.get({ plain: true }));
  } catch (error) {
    console.log(error);
  }
}

// getUserListsById();

const getImportantTodos = async () => {
  try {
    const importantTodos = await todoItem.findAll({
      where: { important: true },
      include: [{ model: todoList, attribute: ["name"] }],
    });
    importantTodos.map((todo) => console.log(todo.get({ plain: true })));
  } catch (error) {
    console.log(error);
  }
};

// getImportantTodos();

const getUserWithListsAndTasks = async () => {
  try {
    const userWithLists = await user.findOne({
      where: { id: 2 },
      include: [
        {
          model: todoList,
          attributes: ["name"],
          include: { model: todoItem, attributes: ["task"] },
        },
      ],
    });
    console.log("!!!!!!USER-With-List!!!!!!", userWithLists.get({ plain: true }));
  } catch (error) {}
};

getUserWithListsAndTasks();
