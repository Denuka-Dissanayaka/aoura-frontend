import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Blocks } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import AdduserForm from "../addUserForm/AdduserForm";
import EdituserForm from "../editUserForm/EditUserForm";
import { toast } from "react-toastify";

function Users() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user: loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    getUsers();
  }, [openEditModal]);

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://aoura-backend-production.up.railway.app/api/v1/users",
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setUsers(response.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const deleteUser = async (id) => {
    try {
      const result = await axios.delete(
        `https://aoura-backend-production.up.railway.app/api/v1/users/${id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.msg);
      getUsers();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Users</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new User
        </button>
      </div>

      {/* -------------------- */}

      <AdduserForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getUsersFunc={getUsers}
      />

      {/* ----------------------- */}

      <EdituserForm
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditUserId={setEditUserId}
        editUserId={editUserId}
      />

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>User ID</th>
              <th>Frist Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Network Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="flex justify-center mt-2 w-full">
                  <Blocks
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    visible={true}
                  />
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td className="p-4 text-center">{index + 1}</td>
                  <td className="text-center">{user.uuid}</td>
                  <td className="text-center">{user.fristname}</td>
                  <td className="text-center">{user.lastname}</td>
                  <td className="text-center">{user.username}</td>
                  <td className="text-center">{user.network.name}</td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        setOpenEditModal(true);
                        setEditUserId(user.uuid);
                      }}
                      className="bg-green-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteUser(user.uuid);
                      }}
                      className={`bg-red-600 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded ${
                        loggedInUser.username === user.username ||
                        user.username === "denuka123"
                          ? "hidden"
                          : ""
                      }`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
