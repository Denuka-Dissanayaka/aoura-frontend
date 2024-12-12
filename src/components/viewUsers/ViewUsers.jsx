import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewUsers({ openViewModal, setOpenViewModal, viewUserId }) {
  const api_url = import.meta.env.VITE_API_URL;

  const [network, setNetwork] = useState("");
  const [fristname, setFristname] = useState("");
  const [lastname, setLastname] = useState("");
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [uuid, setUuid] = useState("");
  const [date, setDate] = useState("");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getUser = async () => {
    if (viewUserId !== null) {
      try {
        const response = await axios.get(
          `${api_url}/api/v1/users/${viewUserId}`,
          {
            headers: {
              "access-token": localStorage.getItem("token"),
            },
            withCredentials: true,
          }
        );
        setNetwork(response.data.network.name);
        setUuid(response.data.uuid);
        setFristname(response.data.fristname);
        setLastname(response.data.lastname);
        setUsername(response.data.username);
        setRole(response.data.role);
        setDate(response.data.createdAt);
      } catch (error) {
        if (error.response) {
          //setMsg(error.response.data.msg);
          toast.error(error.response.data.msg);
        }
      }
    }
  };

  //console.log(network);
  useEffect(() => {
    setNetwork("");
    setUuid("");
    setFristname("");
    setLastname("");
    setUsername("");
    setRole("");
    setDate("");
    getUser();
  }, [viewUserId]);

  return (
    <div
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${
        openViewModal ? "" : "hidden"
      } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-70`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              User Info
            </h3>
            <button
              onClick={() => setOpenViewModal(false)}
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

          <div className="p-4">
            <div className="m-2">
              <p className="font-semibold text-lg">Fristname :</p>
              <p>{`${fristname}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Lastname :</p>
              <p>{`${lastname}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">User ID :</p>
              <p>{`${uuid}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Username :</p>
              <p>{`${username}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Network Name :</p>
              <p>{`${network}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Role :</p>
              <p>{`${role}`}</p>
            </div>

            <div className="m-2">
              <p className="font-semibold text-lg">Created Date :</p>
              <p>{`${date}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUsers;
