import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";

function AdduserForm({ openModal, setOpenModal, getUsersFunc }) {
  const api_url = import.meta.env.VITE_API_URL;

  const [fristName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [role, setRole] = useState("");
  const [network, setNetwork] = useState("");
  const [networks, setNetworks] = useState([]);
  const [msg, setMsg] = useState("");
  const [eyeOpen, setEyeOpen] = useState(false);
  const [eyeOpenRe, setEyeOpenRe] = useState(false);

  const navigate = useNavigate();

  const getNetworks = async () => {
    const response = await axios.get(`${api_url}/api/v1/networks`, {
      headers: {
        "access-token": localStorage.getItem("token"),
      },
      withCredentials: true,
    });
    setNetworks(response.data);
  };

  useEffect(() => {
    getNetworks();
  }, []);

  console.log(networks);

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${api_url}/api/v1/users`,
        {
          fristName: fristName,
          lastName: lastName,
          userName: userName,
          password: password,
          confPassword: conPassword,
          networkId: network,
          role: role,
        },
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.msg);
      setFristName("");
      setLastName("");
      setRole("");
      setNetwork("");
      setUserName("");
      setPassword("");
      setConPassword("");
      navigate("/users");
      getUsersFunc();
      setOpenModal(false);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  const handleEye = () => {
    setEyeOpen(!eyeOpen);
  };

  const handleEyeRe = () => {
    setEyeOpenRe(!eyeOpenRe);
  };
  return (
    <div
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${
        openModal ? "" : "hidden"
      } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-70`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create New User
            </h3>
            <button
              onClick={() => setOpenModal(false)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="crud-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={saveUser}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <p className="text-sm text-red-600">{msg}</p>
              <div className="col-span-2">
                <label
                  for="fristname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Frist Name
                </label>
                <input
                  type="text"
                  name="fristname"
                  id="fristname"
                  value={fristName}
                  onChange={(e) => {
                    setFristName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type frist name"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  for="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type last name"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  for="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Username"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    type={eyeOpen ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Password"
                    required
                  />
                  <p
                    className="ml-[-22px] cursor-pointer text-xs"
                    onClick={handleEye}
                  >
                    {!eyeOpen ? <IoEye /> : <IoEyeOff />}
                  </p>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  for="retypepassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Re-type Password
                </label>
                <div className="flex items-center">
                  <input
                    type={eyeOpenRe ? "text" : "password"}
                    name="retypepassword"
                    id="retypepassword"
                    value={conPassword}
                    onChange={(e) => {
                      setConPassword(e.target.value);
                    }}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Re-type Password"
                    required
                  />
                  <p
                    className="ml-[-22px] cursor-pointer text-xs"
                    onClick={handleEyeRe}
                  >
                    {!eyeOpenRe ? <IoEye /> : <IoEyeOff />}
                  </p>
                </div>
              </div>
              {/* <div className="col-span-2 sm:col-span-1">
                <label
                  for="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$2999"
                  required=""
                />
              </div> */}
              <div className="col-span-2 sm:col-span-1">
                <label
                  for="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Role
                </label>
                <select
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                >
                  <option selected="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <label
                  for="network"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Network
                </label>
                <select
                  id="network"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={network}
                  onChange={(e) => {
                    setNetwork(e.target.value);
                  }}
                >
                  <option selected="">Select Network</option>
                  {networks.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              Add new User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdduserForm;
