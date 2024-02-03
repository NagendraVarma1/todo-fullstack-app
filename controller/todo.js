const Todo = require("../models/todo");
const sequelize = require("../util/database");

exports.addTodo = async (req, res, next) => {
  try {
    console.log(req.body);
    const name = req.body.name;
    const description = req.body.desc;
    const status = req.body.status;

    const data = await Todo.create({
      name: name,
      description: description,
      status: status,
    });
    res.status(201).json({ newTodoDetails: data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getAllTodos = (req, res, next) => {
  Todo.findAll()
    .then((data) => {
      res.status(200).json({ allTodoDetails: data });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.deleteTodo = async (req, res, next) => {
  try {
    let todoId = req.params.id;
    console.log(todoId);
    await Todo.destroy({
      where: {
        id: todoId,
      },
    });
    console.log(`Todo with Id ${todoId} is Deleted`);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateTodo = async (req, res, next) => {
  try {
    let todoId = req.params.id;

    const todo = await Todo.findOne({
      where: { id: todoId },
    });

    const name = req.body.name;
    const description = req.body.desc;
    const status = req.body.status;

    const data = await todo.update({
      name: name,
      description: description,
      status: status,
    });
    res.status(200).json({ newTodoDetails: data });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
