import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Blocks } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import AdduserForm from "../addUserForm/AdduserForm";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

import EditStaffForm from "../editStaffForm/EditStaffForm";
import AddStaffForm from "../addStaffForm/AddStaffForm";
import ViewStaff from "../viewStaff/ViewStaff";

function Staff() {
  const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [networks, setNetworks] = useState([]);
  const [network, setNetwork] = useState("");
  const [editStaffId, setEditStaffId] = useState(null);
  const [viewStaffId, setViewStaffId] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);

  const [page, setPage] = useState(0);
  const [pageWhenNetworkSelected, setPageWhenNetworkSelected] = useState(0);
  const [limit, setLimit] = useState(2);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getNetworks();
  }, []);

  useEffect(() => {
    getStaffs();
  }, [page]);

  useEffect(() => {
    getStaffs();
  }, [openEditModal]);

  useEffect(() => {
    network !== "" ? getStaffsBasedOnNetwork() : getStaffs();
  }, [network, pageWhenNetworkSelected]);

  const getStaffs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/staffs?page=${page}&limit=${limit}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setUsers(response.data.response);
      setPage(response.data.page);
      setLimit(response.data.limit);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const getNetworks = async () => {
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/networks`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      setNetworks(response.data);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  // get staffs based on network
  const getStaffsBasedOnNetwork = async () => {
    setLoading(true);
    setPage(0);
    setPageWhenNetworkSelected(0);
    setPages(0);
    setRows(0);
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/staffs/base-on-network/${network}?page=${pageWhenNetworkSelected}&limit=${limit}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setUsers(response.data.response);
      setPage(response.data.page);
      setLimit(response.data.limit);
      setPages(response.data.totalPage);
      setRows(response.data.totalRows);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  };

  const deleteStaff = async (id) => {
    try {
      const result = await axios.delete(
        `https://aoura-backend-production.up.railway.app/api/v1/staffs/${id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.msg);
      getStaffs();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const changePage = ({ selected }) => {
    //setPage(selected);
    network !== "" ? setPageWhenNetworkSelected(selected) : setPage(selected);
    // if (selected === 9) {
    //   setMsg(
    //     "Jika tidak menemukan data yang Anda cari, silahkan cari data dengan kata kunci spesifik!"
    //   );
    // } else {
    //   setMsg("");
    // }
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Staff Members</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new Member
        </button>

        {user && user.role === "admin" && (
          <div className="grid gap-4 mb-4 grid-cols-4 mt-4">
            <div className="col-span-1 ">
              <select
                id="productType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={network}
                onChange={(e) => {
                  setNetwork(e.target.value);
                }}
              >
                <option selected value={""}>
                  Search By Network
                </option>

                {networks.map((item, index) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* -------------------- */}

      <AddStaffForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getStaffsFunc={getStaffs}
      />

      {/* ----------------------- */}

      <EditStaffForm
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditStaffId={setEditStaffId}
        editStaffId={editStaffId}
      />

      <ViewStaff
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        viewStaffId={viewStaffId}
      />

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>User ID</th>
              <th>Frist Name</th>
              <th>Last Name</th>
              {/* <th>NIC</th> */}
              <th>Network Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <div className="flex justify-center mt-2 w-full">
                <Blocks
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  visible={true}
                />
              </div>
            ) : (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td className="p-4 text-center">#{user.id}</td>
                  <td className="text-center">{user.uuid}</td>
                  <td className="text-center">{user.fristname}</td>
                  <td className="text-center">{user.lastname}</td>
                  {/* <td className="text-center">{user.nic}</td> */}
                  <td className="text-center">{user.network.name}</td>
                  <td className="text-center">
                    <button
                      onClick={() => {
                        setOpenViewModal(true);
                        setViewStaffId(user.uuid);
                      }}
                      className="bg-blue-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setOpenEditModal(true);
                        setEditStaffId(user.uuid);
                      }}
                      className="bg-green-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        deleteStaff(user.uuid);
                      }}
                      className="bg-red-600 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <nav className="flex items-center gap-4 mt-6 justify-center">
          <ReactPaginate
            previousLabel={"< Prev"}
            nextLabel={"Next >"}
            pageCount={pages}
            onPageChange={changePage}
            containerClassName={"flex items-center gap-4"}
            pageClassName={
              "bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
            }
            activeClassName={
              "bg-gray-500 dark:bg-red-600 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
            }
            previousClassName={
              "bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
            }
            nextClassName={
              "bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
            }
            disabledLinkClassName={" text-gray-400 dark:text-gray-700"}
          />
        </nav>
      </div>
    </div>
  );
}

export default Staff;
