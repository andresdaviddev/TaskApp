import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import  ButtonNavBar from './ButtonNavBar'
const NavBar = () => {
  const { user, logOut } = useAuth();

  return (
    <>
      {/* <div className="min-w-[345px] w-screen h-10 bg-zinc-800 sm:hidden flex justify-between select-none">
        <div className="w-1/2 flex justify-center items-center">
          {user && <h2 className="text-center">Welcome {user.username}</h2>}
        </div>
        <div className="w-1/2 flex justify-end items-center">
          <ButtonNavBar/>
        </div>
      </div> */}
      <ButtonNavBar/>
      {/* nav bar para dispositivos mobiles */}
      <nav className="hidden sm:w-screen h-12 bg-zinc-800 sm:flex select-none fixed z-50">
        <div className="w-1/2 flex justify-start items-center px-5">
          {user && <h2>Welcome {user.username}</h2>}
        </div>
        <div className="w-1/2 flex justify-evenly items-center">
          <Link to={"/add-task"}>New task</Link>
          <Link to={"/tasks"}>Tasks</Link>
          <Link to={"/profile"}>Profile</Link>
          <Link
            to={"/login"}
            onClick={() => {
              logOut();
              window.location.reload();
            }}
          >
            LogOut
          </Link>
        </div>
      </nav>
    </>
  );
};

export default NavBar;

{
  /* <ul className="flex justify-evenly items-center mt-3">
          <li>
            <Link to={"/add-task"} className="inline-block">
              New task
            </Link>
          </li>
          <li>
            <Link to={"/tasks"} className="inline-block">
              tasks
            </Link>
          </li>
          <li>
            <Link to={"/profile"} className="inline-block">
              Profile
            </Link>
          </li>
          <li>
            <Link
              to={"/add-task"}
              className="inline-block"
              onClick={() => {
                logOut();
                window.location.reload();
              }}
            >
              LogOuT
            </Link>
          </li>
        </ul> */
}
