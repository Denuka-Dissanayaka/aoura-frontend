import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";

import AddOrderForm from "../addOrderForm/AddOrderForm";

function Orders() {
  //const api_url = import.meta.env.VITE_API_URL;

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    getOrders();
  }, [openEditModal]);

  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/orders`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setOrders(response.data);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const deleteOrder = async (id) => {
    try {
      const result = await axios.delete(
        `https://aoura-backend-production.up.railway.app/api/v1/orders/${id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.msg);
      //console.log(result);
      getOrders();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Orders</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new Order
        </button>
      </div>

      {/* -------------------- */}
      <AddOrderForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getOrdersFunc={getOrders}
      />

      {/* ----------------------- */}

      {/* <EditProductForm
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditProductId={setEditProductId}
        editProductId={editProductId}
      /> */}

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Network</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Status</th>

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
              orders.map((order, index) => (
                <>
                  <tr key={order.uuid}>
                    <td className="p-4 text-center">#{index + 1}</td>
                    <td className="text-center">{order.product.name}</td>
                    <td className="text-center">{order.customer.name}</td>
                    <td className="text-center">{order.network.name}</td>
                    <td className="text-center">{order.quantity}</td>
                    <td className="text-center">{order.price}</td>
                    <td className="text-center">{order.status}</td>

                    <td className="text-center">
                      <button
                        onClick={() => {
                          setOpenEditModal(true);
                          //setEditorderId(order.uuid);
                        }}
                        className="bg-green-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteOrder(order.uuid);
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

export default Orders;
