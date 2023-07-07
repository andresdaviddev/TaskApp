import { Children, useEffect, useState } from "react";
import { createContext, useContext } from "react";
import {
  addTaskRequest,
  getTasksrequest,
  deleteTaskRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaks must be used within an AuthProvider ");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [newTask, setNewTask] = useState(null);
  const [createTaskErrors, setCreateTaskErrors] = useState([]);
  const [allTasks, setAlltasks] = useState([]);

  useEffect(() => {
    if (createTaskErrors.length > 0) {
      const timer = setTimeout(() => {
        setCreateTaskErrors([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [createTaskErrors]);

  const getTasks = async () => {
    const response = await getTasksrequest();
    setAlltasks(response);
    // console.log(response);
  };

  const getTask = async (id) => {
    const res = await getTaskRequest(id);
    return res.data;
  };

  const createTaks = async (values) => {
    try {
      if (values.title.length < 1 || values.description.length < 1) {
        setCreateTaskErrors(["Title and description are required"]);
        return;
      }
      const res = await addTaskRequest(values);
      setNewTask(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteTask = async (id) => {
    const res = await deleteTaskRequest(id);
    // console.log(res);
    getTasks();
  };

  const updateTask = async (id, values) => {
    const res = await updateTaskRequest(id, values);
    console.log(res.data);
    return res.data;
  };

  return (
    <TaskContext.Provider
      value={{
        createTaks,
        getTasks,
        getTask,
        deleteTask,
        updateTask,
        newTask,
        createTaskErrors,
        allTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
