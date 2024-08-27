import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

//import EditProductForm from "../editProductForm/EditProductForm";
//import AddProductForm from "../addProductForm/AddProductForm";
import AddNetworkForm from "../addNetworkForm/AddNetworkForm";
import EditNetworkForm from "../editNetworkForm/EditNetworkForm";

const recentOrderData = [
  {
    id: "1",
    product_id: "1255",
    customer_id: "23143",
    customer_name: "Product 1",
    order_date: "$435.50",
    order_total: "355",
    current_order_status: "PLACED",
    shipment_address: "Cottage Grove, OR 97424",
  },
  {
    id: "7",
    product_id: "45322",
    customer_id: "96453",
    customer_name: "Product 2",
    order_date: "$96.35",
    order_total: "96",
    current_order_status: "CONFIRMED",
    shipment_address: "Los Angeles, CA 90017",
  },
  {
    id: "2",
    product_id: "34789",
    customer_id: "65345",
    customer_name: "Product 3",
    order_date: "$836.44",
    order_total: "36",
    current_order_status: "SHIPPED",
    shipment_address: "Westminster, CA 92683",
  },
  {
    id: "3",
    product_id: "09545",
    customer_id: "87832",
    customer_name: "Product 4",
    order_date: "$334.50",
    order_total: "50",
    current_order_status: "SHIPPED",
    shipment_address: "San Mateo, CA 94403",
  },
];

function Networks() {
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editNetworkId, setEditNetworkId] = useState(null);
  const [networks, setNetworks] = useState([]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getNetworks();
  }, []);

  useEffect(() => {
    getNetworks();
  }, [openEditModal]);

  const getNetworks = async () => {
    const response = await axios.get(
      "https://aoura-backend-production.up.railway.app/api/v1/networks",
      {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    setNetworks(response.data);
  };

  const deleteNetwork = async (id) => {
    await axios.delete(
      `https://aoura-backend-production.up.railway.app/api/v1/networks/${id}`,
      {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      }
    );
    getNetworks();
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
            {networks.map((network, index) => (
              <>
                <tr key={network.uuid}>
                  <td className="p-4 text-center">#{index + 1}</td>
                  <td className="text-center">{network.uuid}</td>
                  <td className="text-center">{network.name}</td>

                  <td className="text-center">
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Networks;
