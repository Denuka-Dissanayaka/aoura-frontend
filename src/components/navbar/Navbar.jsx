import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeCotext } from "../../context/ThemeContextProvider";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, reset } from "../../features/authSlice";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeCotext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // const logout = () => {
  //   dispatch(LogOut());
  //   dispatch(reset());
  //   navigate("/");
  // };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-lg font-bold italic">{`Welcome..! ${
        user && user.fristname
      } ${user && user.lastname} (${user && user.role})`}</h1>
      <div className="flex items-center gap-3">
        <button
          onClick={logout}
          className="bg-dark-purple hover:bg-red-500 dark:bg-gray-800 dark:hover:bg-dark-purple hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
        <button className="text-2xl text-dark" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
