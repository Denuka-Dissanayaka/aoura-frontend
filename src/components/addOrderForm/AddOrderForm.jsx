import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddOrderForm({ openModal, setOpenModal, getOrdersFunc }) {
  const api_url = import.meta.env.VITE_API_URL;

  const [network, setNetwork] = useState("");
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [networks, setNetworks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [tempCustomerName, setTempCustomerName] = useState("");
  const [tempCustomerEmail, setTempCustomerEmail] = useState("");
  const [tempCustomerPhone, setTempCustomerPhone] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [msg, setMsg] = useState("");
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

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
        setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  // get customers based on network
  const getCustomers = async () => {
    try {
      const response = await axios.get(
        `${api_url}/api/v1/customers/base-on-network/${network}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setCustomers(response.data);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        //toast.error(error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  };

  // get products based on network
  const getProducts = async () => {
    try {
      const response = await axios.get(
        `${api_url}/api/v1/products/base-on-network/${network}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setProducts(response.data);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        //toast.error(error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  };

  //get product price
  const getProductPrice = async () => {
    try {
      const response = await axios.get(
        `${api_url}/api/v1/products/get-price/${product}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      //const up = response.data.price;
      setUnitPrice(response.data.price);
      console.log(response.data.price);
      //console.log(unitPrice);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        //toast.error(error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    getProductPrice();
    setTotalPrice(0);
    setQuantity(0);
    //console.log(totalPrice);
  }, [product]);

  useEffect(() => {
    setTotalPrice(quantity * unitPrice);
  }, [quantity]);

  useEffect(() => {
    getCustomers();
    getProducts();
  }, [network]);

  useEffect(() => {
    getNetworks();
  }, []);

  useEffect(() => {
    if (user?.role === "user") {
      setNetwork(user.networkId);
    }
  }, [user]);

  useEffect(() => {
    if (openModal === false) {
      setNetwork("");
      setCustomer("");
      setProduct("");
      setDate("");
      setQuantity("");
      setUnitPrice("");
      setTotalPrice(0);
      setTempCustomerEmail("");
      setTempCustomerName("");
      setTempCustomerPhone("");
    }
  }, [openModal]);

  const saveOrder = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${api_url}/api/v1/orders`,
        {
          productId: product,
          price: totalPrice,
          quantity: quantity,
          customerId: customer,
          date: date,
          networkId: network,
          tempCustomerName,
          tempCustomerEmail,
          tempCustomerPhone,
        },
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.msg);
      setNetwork("");
      setCustomer("");
      setProduct("");
      setDate("");
      setQuantity("");
      setUnitPrice("");
      setTotalPrice(0);
      setTempCustomerEmail("");
      setTempCustomerName("");
      setTempCustomerPhone("");
      navigate("/orders");
      getOrdersFunc();
      setOpenModal(false);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
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
              Create New Order
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

          <form className="p-4 md:p-5" onSubmit={saveOrder}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <p className="text-sm text-red-600">{msg}</p>
              {user?.role === "admin" && (
                <div className="col-span-2 ">
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
              )}
              <div className={`col-span-2 ${network != "" ? "" : "hidden"}`}>
                <label
                  for="customer"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Customer
                </label>
                <select
                  id="customer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={customer}
                  onChange={(e) => {
                    setCustomer(e.target.value);
                  }}
                >
                  <option selected="">Select Customer</option>
                  {customers.map((item, index) => (
                    <option
                      key={item.id}
                      value={item.id}
                      className={`${item.id === 1 ? "hidden" : ""}`}
                    >
                      {item.name}
                    </option>
                  ))}
                  <option value={1}>Add Temporary Customer</option>
                </select>
              </div>

              {customer === "1" && (
                <>
                  <div className="col-span-2">
                    <label
                      htmlFor="temp_customer_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Customer Name
                    </label>
                    <input
                      type="text"
                      name="temp_customer_name"
                      id="temp_customer_name"
                      value={tempCustomerName}
                      onChange={(e) => {
                        setTempCustomerName(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Customer Name"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="temp_customer_email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Customer Email
                    </label>
                    <input
                      type="email"
                      name="temp_customer_email"
                      id="temp_customer_email"
                      value={tempCustomerEmail}
                      onChange={(e) => {
                        setTempCustomerEmail(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Customer Email"
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      htmlFor="temp_customer_Phone"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Customer Phone Number
                    </label>
                    <input
                      type="text"
                      name="temp_customer_Phone"
                      id="temp_customer_Phone"
                      value={tempCustomerPhone}
                      onChange={(e) => {
                        setTempCustomerPhone(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Customer Phone Number"
                    />
                  </div>
                </>
              )}

              <div className={`col-span-2 ${network != "" ? "" : "hidden"}`}>
                <label
                  for="product"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Product
                </label>
                <select
                  id="product"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={product}
                  onChange={(e) => {
                    setProduct(e.target.value);
                  }}
                >
                  <option selected="">Select Product</option>
                  {products.map((item, index) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label
                  for="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={date}
                  onChange={(e) => {
                    setDate(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Date"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  for="quantity"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  id="quantity"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$Quantity"
                  required
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  for="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Total Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={totalPrice}
                  id="price"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="$Price"
                  required
                />
              </div>

              {/* <div className="col-span-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write product description here"
                ></textarea>
              </div> */}
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
              Add new Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddOrderForm;
