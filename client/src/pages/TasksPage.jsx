import TaskCard from "../components/TaskCard";

const TasksPage = () => {

  return (
    <div className=" w-screen  grid grid-cols-1 grid-rows-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5 px-10 py-10">
      <TaskCard />
    </div>
  );
};

export default TasksPage;
