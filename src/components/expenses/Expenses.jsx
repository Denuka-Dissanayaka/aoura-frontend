import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";

import AddExpensesForm from "../addExpensesForm/AddExpensesForm.jsx";
import EditExpensesForm from "../editExpensesForm/EditExpensesForm.jsx";

function Expenses() {
  //const api_url = import.meta.env.VITE_API_URL;

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editExpensesId, setEditExpensesId] = useState(null);
  const [networks, setNetworks] = useState([]);
  const [network, setNetwork] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    getExpenses();
    getNetworks();
  }, []);

  useEffect(() => {
    getExpenses();
  }, [openEditModal]);

  useEffect(() => {
    network !== "" ? getExpensesBasedOnNetwork() : getExpenses();
  }, [network]);

  const getExpenses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/expenses`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setExpenses(response.data);
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

  // get products based on network
  const getExpensesBasedOnNetwork = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://aoura-backend-production.up.railway.app/api/v1/expenses/base-on-network/${network}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      setExpenses(response.data);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  };

  const deleteExpense = async (id) => {
    try {
      const result = await axios.delete(
        `https://aoura-backend-production.up.railway.app/api/v1/expenses/${id}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.msg);
      //console.log(result);
      getExpenses();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Expenses</h2>
      <div className="mb-6">
        <button
          onClick={() => setOpenModal(true)}
          data-modal-target="crud-modal"
          data-modal-toggle="crud-modal"
          className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
        >
          Add new Record
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
      <AddExpensesForm
        openModal={openModal}
        setOpenModal={setOpenModal}
        getExpensesFunc={getExpenses}
      />

      {/* ----------------------- */}

      <EditExpensesForm
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        setEditExpensesId={setEditExpensesId}
        editExpensesId={editExpensesId}
      />

      <div>
        <table className=" table-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="p-4">ID</th>
              <th>Type</th>
              <th>Network</th>
              <th>Date</th>
              <th>Value</th>

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
              expenses.map((expense, index) => (
                <>
                  <tr key={expense.uuid}>
                    <td className="p-4 text-center">#{index + 1}</td>
                    <td className="text-center">{expense.type}</td>
                    <td className="text-center">{expense.network.name}</td>
                    <td className="text-center">{expense.date}</td>
                    <td className="text-center">{expense.value}</td>

                    <td className="text-center">
                      <button
                        onClick={() => {
                          setOpenEditModal(true);
                          setEditExpensesId(expense.uuid);
                        }}
                        className="bg-green-600 mr-2 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          deleteExpense(expense.uuid);
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

export default Expenses;
