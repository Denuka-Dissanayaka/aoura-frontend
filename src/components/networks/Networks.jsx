import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Blocks } from "react-loader-spinner";
import { toast } from "react-toastify";
import ReactPaginate from "react-paginate";

import AddNetworkForm from "../addNetworkForm/AddNetworkForm";
import EditNetworkForm from "../editNetworkForm/EditNetworkForm";
import ViewNetwork from "../viewNetwork/ViewNetwork";

function Networks() {
  const api_url = import.meta.env.VITE_API_URL;

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editNetworkId, setEditNetworkId] = useState(null);
  const [viewNetworkId, setViewNetworkId] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [searchByName, setSearchByName] = useState("");
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    getNetworks();
  }, [page]);

  useEffect(() => {
    setPage(0);
    getNetworks();
  }, [searchByName]);

  useEffect(() => {
    getNetworks();
  }, [openEditModal]);

  const getNetworks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}/api/v1/networks2?page=${page}&limit=${limit}&search_by_name=${searchByName}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setNetworks(response.data.response);
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

  const deleteNetwork = async (id) => {
    try {
      const result = await axios.delete(`${api_url}/api/v1/networks/${id}`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      toast.success(result.data.msg);
      getNetworks();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const changePage = ({ selected }) => {
    setPage(selected);
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Networks</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new Network
        </button>
        <div className="grid gap-4 mb-4 grid-cols-4 mt-4">
          <div className="col-span-1 ">
            <input
              type="text"
              name="earchByName"
              value={searchByName}
              onChange={(e) => {
                setSearchByName(e.target.value);
              }}
              id="earchByName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search By Name"
            />
          </div>
        </div>
      </div>

      {/* -------------------- */}
      <AddNetworkForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getNetworksFunc={getNetworks}
      />

      {/* ----------------------- */}

      <EditNetworkForm
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditNetworkId={setEditNetworkId}
        editNetworkId={editNetworkId}
      />

      <ViewNetwork
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        viewNetworkId={viewNetworkId}
      />

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>Network ID</th>
              <th>Name</th>

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
              networks.map((network, index) => (
                <>
                  <tr key={network.uuid}>
                    <td className="p-4 text-center">#{network.id}</td>
                    <td className="text-center">{network.uuid}</td>
                    <td className="text-center">{network.name}</td>

                    <td className="text-center">
                      <button
                        onClick={() => {
                          setOpenViewModal(true);
                          setViewNetworkId(network.uuid);
                        }}
                        className="bg-blue-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setOpenEditModal(true);
                          setEditNetworkId(network.uuid);
                        }}
                        className="bg-green-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteNetwork(network.uuid);
                        }}
                        className="bg-red-600 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </>
              ))
            )}
          </tbody>
        </table>
        <p className="text-right mt-1 mb-1">
          Total Rows: {rows} Page: {rows ? page + 1 : 0} of {pages}
        </p>
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

export default Networks;
