import Task from "../models/task.model.js";
import User from "../models/user.model.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    user: req.user.id,
  }).populate("user");
  res.json(tasks); // se envian al frontEnd
};

export const getTask = async (req, res) => {
  const task = await Task.findById(req.params.id); // se busca una tarea a traves del id que viene de los parametros
  if (!task) return res.status(404).json({ message: "task not found" });
  res.json(task); // se nevian al frontEnd
};

export const createTasks = async (req, res) => {
  const { title, description, date } = req.body; // se obtienen los datos desde el req.body
  const newTask = new Task({
    title,
    description,
    date,
    user: req.user.id,
  });
  const savedTask = await newTask.save(); // se guarda la tarea
  res.json(savedTask); // se nevian al frontEnd
};

export const deleteTasks = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id); // se busca una tarea por su id y se elimina
  if (!task) return res.status(404).json({ message: "task not found" });
  res.sendStatus(204);
};

export const updateTasks = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); // se busca una tarea por su id y se edita, a demas de devolver la tarea editada
  if (!task) return res.status(404).json({ message: "task not found" });
  res.json(task); // se nevian al frontEnd
};
