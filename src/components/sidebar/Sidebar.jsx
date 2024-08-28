import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";
//import { AiFillAmazonSquare } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiFlowerFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

// icons
import { FaDiceD6 } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaBuilding } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

function Sidebar() {
  const [navbarResize, setNavbarReside] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const { isError, user } = useSelector((state) => state.auth);

  const menu = [
    {
      title: "Dashboard",
      link: "/dashboard",
      onlyAdmin: false,
      icon: <MdDashboard />,
    },
    {
      title: "Products",
      link: "/products",
      onlyAdmin: false,
      icon: <FaDiceD6 />,
    },
    {
      title: "Staff",
      spacing: true,
      link: "/staff",
      onlyAdmin: true,
      icon: <IoIosPeople />,
    },
    {
      title: "Networks",
      link: "/networks",
      onlyAdmin: true,
      icon: <FaBuilding />,
      // submenu: true,
      // submenuItems: [
      //   { title: "Submenu 1" },
      //   { title: "Submenu 2" },
      //   { title: "Submenu 3" },
      // ],
    },
    { title: "Users", link: "/users", onlyAdmin: true, icon: <FaUserTie /> },
  ];

  function handleResize() {
    setNavbarReside(!navbarResize);
  }
  return (
    <div
      className={`bg-dark-purple h-screen p-5 pt-8 fixed ${
        navbarResize ? "w-20" : "w-72"
      } duration-300`}
    >
      <BsArrowLeftShort
        // onClick={handleResize}
        className={`${
          navbarResize && "rotate-180"
        } bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer`}
      />

      <div className="inline-flex">
        <RiFlowerFill className="text-4xl rounded bg-white mr-4" />
        <h1
          className={`text-white font-medium text-2xl origin-left duration-300 ${
            navbarResize && "scale-0"
          }`}
        >
          AOURA
        </h1>
      </div>

      <ul>
        {menu.map((item, index) => {
          return (
            <>
              {user && user.role === "admin" && (
                <>
                  <li
                    key={index}
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
                  >
                    <NavLink to={item.link}>
                      <span className="text-2xl block float-left mr-4">
                        {item.icon}
                      </span>
                      <span
                        className={`text-base font-medium flex-1 duration-300 ${
                          navbarResize && "hidden"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.submenu && !navbarResize && (
                        <RiArrowDropDownLine
                          className={`text-xl ${submenuOpen && "rotate-180"}`}
                          onClick={() => setSubmenuOpen(!submenuOpen)}
                        />
                      )}
                    </NavLink>
                  </li>
                  {item.submenu && submenuOpen && !navbarResize && (
                    <ul>
                      {item.submenuItems.map((submenuItem, index) => (
                        <li
                          key={index}
                          className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-6 hover:bg-light-white rounded-md mt-2"
                        >
                          {submenuItem.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}

              {user && user.role === "user" && !item.onlyAdmin && (
                <>
                  <li
                    key={index}
                    className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md mt-2"
                  >
                    <NavLink to={item.link}>
                      <span className="text-2xl block float-left mr-4">
                        <MdDashboard />
                      </span>
                      <span
                        className={`text-base font-medium flex-1 duration-300 ${
                          navbarResize && "hidden"
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.submenu && !navbarResize && (
                        <RiArrowDropDownLine
                          className={`text-xl ${submenuOpen && "rotate-180"}`}
                          onClick={() => setSubmenuOpen(!submenuOpen)}
                        />
                      )}
                    </NavLink>
                  </li>
                  {item.submenu && submenuOpen && !navbarResize && (
                    <ul>
                      {item.submenuItems.map((submenuItem, index) => (
                        <li
                          key={index}
                          className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-6 hover:bg-light-white rounded-md mt-2"
                        >
                          {submenuItem.title}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;
