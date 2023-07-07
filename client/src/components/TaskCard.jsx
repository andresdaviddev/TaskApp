import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";

const TaskCard = () => {
  const { getTasks, allTasks, deleteTask } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);

  // useEffect(()=>{
  //   console.log(allTasks);
  // },[allTasks])

  if (allTasks.length > 0) {
    return allTasks.map((task, i) => {
      return (
        <div
          key={i}
          className="w-full min-w-[280px] max-w-full h-full sm:h-44 bg-zinc-800 rounded-lg mt-10 select-none relative"
        >
          <h2 className="text-center text-xl">{task.title}</h2>
          <div className=" h-[100px]  mt-1 overflow-auto flex flex-col justify-evenly items-center px-4">
            <p>{task.description}</p>
          </div>
          <footer className=" w-full h-1/4 absolute bottom-0 flex justify-start items-center ">
            <button
              className="w-[100px] h-[35px] rounded-md bg-rose-500 ml-2"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Delete
            </button>
            <button className="w-[100px] h-[35px] rounded-md bg-blue-600 flex justify-center items-center ml-5">
             <Link to={`/tasks/${task._id}`}>Edit</Link>
            </button>
            <p className="ml-5">{new Date(task.date).toLocaleDateString()}</p>
          </footer>
        </div>
      );
    });
  } else {
    return <h2 className="text-xl font-bold select-none py-10 px-10">No tasks yet</h2>;
  }
};

export default TaskCard;
