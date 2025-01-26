import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";
import ReactPaginate from "react-paginate";

import AddCustomerForm from "../addCustomerForm/AddCustomerForm";
import EditCustomerForm from "../editCustomerForm/EditCustomerForm";
import ViewCustomer from "../viewCustomer/VIewCustomer";

function Customers() {
  const api_url = import.meta.env.VITE_API_URL;

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [editCustomerId, setEditCustomerId] = useState(null);
  const [viewCustomerId, setViewCustomerId] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [network, setNetwork] = useState("");
  const [id, setId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const [searchByName, setSearchByName] = useState("");
  const [page, setPage] = useState(0);
  const [pageWhenNetworkSelected, setPageWhenNetworkSelected] = useState(0);
  const [limit, setLimit] = useState(10);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    if (user?.role === "user") {
      setNetwork(user.networkId);
    }
  }, [user]);

  useEffect(() => {
    getCustomers();
  }, [page]);

  useEffect(() => {
    getNetworks();
  }, []);

  useEffect(() => {
    getCustomers();
  }, [openEditModal]);

  useEffect(() => {
    setPageWhenNetworkSelected(0);
    setPage(0);
    setPages(0);
    setRows(0);

    network !== "" || searchByName !== ""
      ? getCustomersBasedOnNetwork()
      : getCustomers();
  }, [network, searchByName]);

  useEffect(() => {
    if (network !== "") {
      getCustomersBasedOnNetwork();
    }
  }, [pageWhenNetworkSelected]);

  const getCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}/api/v1/customers?page=${page}&limit=${limit}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setCustomers(response.data.response);
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

  // get customers based on network
  const getCustomersBasedOnNetwork = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}/api/v1/customers/base-on-network2/${network}?page=${pageWhenNetworkSelected}&limit=${limit}&search_by_name=${searchByName}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setCustomers(response.data.response);
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

  const deleteCustomer = async (id) => {
    try {
      const result = await axios.delete(`${api_url}/api/v1/customers/${id}`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });
      toast.success(result.data.msg);
      //console.log(result);
      getCustomers();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  const changePage = ({ selected }) => {
    network !== "" || searchByName !== ""
      ? setPageWhenNetworkSelected(selected)
      : setPage(selected);
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Customers</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new Customer
        </button>
        {user?.role === "admin" && (
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
        {user?.role === "user" && (
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
        )}
      </div>

      {/* -------------------- */}
      <AddCustomerForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getCustomersFunc={getCustomers}
      />

      {/* ----------------------- */}

      <EditCustomerForm
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditCustomerId={setEditCustomerId}
        editCustomerId={editCustomerId}
      />

      <ViewCustomer
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        viewCustomerId={viewCustomerId}
        id={id}
      />

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>Name</th>
              <th>Loan Amount</th>
              <th>Paid Loan Amount</th>
              {/* <th>Phone No</th> */}
              <th>Network</th>
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
              customers.map((customer, index) => (
                <>
                  <tr
                    key={customer.uuid}
                    className={`${customer.id === 1 ? "hidden" : ""}`}
                  >
                    <td className="p-4 text-center">#{customer.id}</td>
                    <td className="text-center">{customer.name}</td>
                    <td className="text-center">{customer.loanAmount}</td>
                    <td className="text-center">{customer.paidloanAmount}</td>
                    {/* <td className="text-center">{customer.phone}</td> */}
                    <td className="text-center">{customer.network.name}</td>

                    <td className="text-center">
                      <button
                        onClick={() => {
                          setOpenViewModal(true);
                          setViewCustomerId(customer.uuid);
                          setId(index + 1);
                        }}
                        className="bg-blue-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        View
                      </button>
                      <button
                        onClick={() => {
                          setOpenEditModal(true);
                          setEditCustomerId(customer.uuid);
                        }}
                        className="bg-green-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteCustomer(customer.uuid);
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

export default Customers;
