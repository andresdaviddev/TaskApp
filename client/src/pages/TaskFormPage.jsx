import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { get } from "mongoose";

function TaskFormPage() {
  const { createTaks, createTaskErrors, getTask, updateTask } = useTasks();
  const { register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  // useEffect para guardar los paramas en un estado
  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        // console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    };
    loadTask();
  }, []);
  // funcion onSubmit para crear una nueva tarea
  const onSubmit = handleSubmit(async (values) => {
    if (params.id) {
      await updateTask(params.id, values);
    } else {
      await createTaks(values);
    }
    navigate("/tasks");
  });
  // reenderizado del componente
  return (
    <div className="w-screen h-screen flex-col flex justify-center items-center">
      {createTaskErrors.map((error, i) => {
        return <div key={i}>{error}</div>;
      })}
      <form
        onSubmit={onSubmit}
        className="w-[calc(100%-50px)] max-w-[380px] min-w-[280px] md:max-w-[450px] sm:w-[calc(1/2 - 40px)] md:w-1/3 lg:w-1/3 xl:w-1/3 2xl:w-1/3 rounded-xl bg-zinc-700 py-10 px-10 select-none flex flex-col"
      >
        <input
          placeholder="Title"
          {...register("title")}
          className="rounded-md my-5 py-2 bg-zinc-500 focus:outline-none"
          autoFocus
          autoComplete="off"
        ></input>
        <textarea
          placeholder="Description"
          {...register("description")}
          className="rounded-md bg-zinc-500 focus:outline-none mb-5"
          rows={6}
        ></textarea>
        <button
          type="submit"
          className="w-24 h-10 bg-zinc-500 rounded-md hover:bg-blue-600 transition-all duration-300"
        >
          Create
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;
