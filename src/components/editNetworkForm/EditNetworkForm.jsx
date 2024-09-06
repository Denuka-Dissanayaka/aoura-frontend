import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditNetworkForm({
  openEditModal,
  setOpenEditModal,

  setEditNetworkId,
  editNetworkId,
}) {
  const [name, setName] = useState("");

  const [msg, setMsg] = useState("");

  const getNetworkById = async () => {
    if (editNetworkId !== null) {
      try {
        const response = await axios.get(
          `https://aoura-backend-production.up.railway.app/api/v1/networks/${editNetworkId}`,
          {
            headers: {
              "access-token": localStorage.getItem("token"),
            },
            withCredentials: true,
          }
        );
        setName(response.data.name);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  useEffect(() => {
    getNetworkById();
  }, [editNetworkId]);

  const updateNetwork = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.patch(
        `https://aoura-backend-production.up.railway.app/api/v1/networks/${editNetworkId}`,
        {
          networkName: name,
        },
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      //navigate("/products");
      toast.success(result.data.msg);
      setOpenEditModal(false);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${
        openEditModal ? "" : "hidden"
      } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Network
            </h3>
            <button
              onClick={() => {
                setOpenEditModal(false);
                setEditNetworkId(null);
              }}
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

          <form className="p-4 md:p-5" onSubmit={updateNetwork}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-2">
                <label
                  for="networkId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Network ID
                </label>
                <input
                  type="text"
                  name="name"
                  value={editNetworkId}
                  id="networkId"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder=" product id"
                  required
                  readOnly
                />
              </div>

              <div className="col-span-2">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type product name"
                  required
                />
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
              Update Network
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditNetworkForm;
