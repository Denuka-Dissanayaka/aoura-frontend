import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";
import ReactPaginate from "react-paginate";

import AddOrderForm from "../addOrderForm/AddOrderForm";
import EditOrderForm from "../editOrderForm/EditOrderForm";
import ViewOrder from "../viewOrder/ViewOrder";

function Orders() {
  const api_url = import.meta.env.VITE_API_URL;

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);
  const [viewOrderId, setViewOrderId] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [network, setNetwork] = useState("");
  const [orders, setOrders] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(0);
  const [pageWhenNetworkSelected, setPageWhenNetworkSelected] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.role === "user") {
      setNetwork(user.networkId);
    }
  }, [user]);

  useEffect(() => {
    getOrders();
  }, [page]);

  useEffect(() => {
    getNetworks();
  }, []);

  useEffect(() => {
    getOrders();
  }, [openEditModal]);

  useEffect(() => {
    setPageWhenNetworkSelected(0);
    setPage(0);
    setPages(0);
    setRows(0);
    network !== "" || status !== "" ? getOrdersBasedOnNetwork() : getOrders();
  }, [network, status]);

  useEffect(() => {
    if (network !== "") {
      getOrdersBasedOnNetwork();
    }
  }, [pageWhenNetworkSelected]);

  const getOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}/api/v1/orders?page=${page}&limit=${limit}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setOrders(response.data.response);
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
      const response = await axios.get(`${api_url}/api/v1/networks`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });

      setNetworks(response.data);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  // get products based on network
  const getOrdersBasedOnNetwork = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}/api/v1/orders/base-on-network2/${network}?page=${pageWhenNetworkSelected}&limit=${limit}&status=${status}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setOrders(response.data.response);
      setPageWhenNetworkSelected(response.data.page);
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

  const deleteOrder = async (id) => {
    try {
      const result = await axios.delete(`${api_url}/api/v1/orders/${id}`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      toast.success(result.data.msg);
      //console.log(result);
      getOrders();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const changePage = ({ selected }) => {
    network !== "" || status !== ""
      ? setPageWhenNetworkSelected(selected)
      : setPage(selected);
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

        <div className="grid gap-4 mb-4 grid-cols-4 mt-4">
          {user?.role === "admin" && (
            <>
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

              <div className="col-span-1 ">
                <select
                  id="productType"
                  className={`bg-gray-50 border ${
                    network === "" ? "hidden" : ""
                  } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                >
                  <option selected value={""}>
                    Search By Status
                  </option>

                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                </select>
              </div>
            </>
          )}

          {user?.role === "user" && (
            <div className="col-span-1 ">
              <select
                id="productType"
                className={`bg-gray-50 border ${
                  network === "" ? "hidden" : ""
                } border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500`}
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option selected value={""}>
                  Search By Status
                </option>

                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* -------------------- */}
      <AddOrderForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getOrdersFunc={getOrders}
      />

      {/* ----------------------- */}

      <EditOrderForm
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditOrderId={setEditOrderId}
        editOrderId={editOrderId}
      />

      <ViewOrder
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        viewOrderId={viewOrderId}
        id={id}
      />

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>Product</th>
              <th>Customer</th>
              <th>Network</th>
              {/* <th>Quantity</th> */}
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
                    <td className="p-4 text-center">#{order.id}</td>
                    <td className="text-center">{order.product.name}</td>
                    <td className="text-center">{order.customer.name}</td>
                    <td className="text-center">{order.network.name}</td>
                    {/* <td className="text-center">{order.quantity}</td> */}
                    <td className="text-center">{order.price}</td>
                    <td
                      className={`text-center ${
                        order.status === "pending"
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {order.status}
                    </td>

                    <td className="text-center">
                      <button
                        onClick={() => {
                          setOpenViewModal(true);
                          setViewOrderId(order.uuid);
                          setId(index + 1);
                        }}
                        className="bg-blue-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setOpenEditModal(true);
                          setEditOrderId(order.uuid);
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

export default Orders;
