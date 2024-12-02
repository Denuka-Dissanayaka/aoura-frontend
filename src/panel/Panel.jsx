import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";
import Dashboard from "../components/dashboard/Dashboard";
import Products from "../components/products/Products";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Routes, Route } from "react-router-dom";

function Panel({ children }) {
  const [name, setName] = useState("");

  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/api/v1/session")
  //     .then((res) => {
  //       if (res.data.valid) {
  //         setName(res.data.username);
  //       } else {
  //         navigate("/login");
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="grow ml-72 h-full lg:min-h-[100vh] bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <Navbar />
        <div>
          {children}
          {/* <Dashboard /> */}
          {/* <Routes>
            <Route exact path="/dashboard" component={<Dashboard />} />
            <Route exact path="/products" component={<Products />} />
          </Routes> */}
        </div>
      </div>
    </div>
  );
}

export default Panel;
