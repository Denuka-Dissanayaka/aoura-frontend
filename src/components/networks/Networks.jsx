import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Blocks } from "react-loader-spinner";
import { toast } from "react-toastify";
//import EditProductForm from "../editProductForm/EditProductForm";
//import AddProductForm from "../addProductForm/AddProductForm";
import AddNetworkForm from "../addNetworkForm/AddNetworkForm";
import EditNetworkForm from "../editNetworkForm/EditNetworkForm";
import ViewNetwork from "../viewNetwork/ViewNetwork";

function Networks() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editNetworkId, setEditNetworkId] = useState(null);
  const [viewNetworkId, setViewNetworkId] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getNetworks();
  }, []);

  useEffect(() => {
    getNetworks();
  }, [openEditModal]);

  const getNetworks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://aoura-backend-production.up.railway.app/api/v1/networks",
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setNetworks(response.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const deleteNetwork = async (id) => {
    try {
      const result = await axios.delete(
        `https://aoura-backend-production.up.railway.app/api/v1/networks/${id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.msg);
      getNetworks();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
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
                    <td className="p-4 text-center">#{index + 1}</td>
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
      </div>
    </div>
  );
}

export default Networks;
