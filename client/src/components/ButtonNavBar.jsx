import { Link } from "react-router-dom";

function ButtonNavBar() {
  return (
    <>
      <button
        className="w-[28px] mt-2 mx-10 actived sm:hidden select-none"
        id="button"
        onClick={() => {
          const links = document.getElementById("links");
          const btn = document.getElementById("button");
          if (btn.classList.contains("actived")) {
            links.style.width = "100%";
            links.style.height = "40px";
            links.style.display = "flex";
            btn.classList.remove("actived");
          } else {
            links.style.display = "none";
            links.style.height = "40px";
            btn.classList.add("actived");
          }
        }}
      >
        <img src="../public/options.svg" alt="" />
      </button>
      <ul
        className="hidden sm:none  justify-evenly items-center transition-all"
        id="links"
      >
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
      </ul>
    </>
    // <div className="select-none sm:hidden" id="nav-bar-mobile">

    // </div>
  );
}

export default ButtonNavBar;
