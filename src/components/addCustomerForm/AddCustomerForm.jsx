import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AddCustomerForm({ openModal, setOpenModal, getCustomersFunc }) {
  const api_url = import.meta.env.VITE_API_URL;

  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [network, setNetwork] = useState("");
  const [networks, setNetworks] = useState([]);
  const [loanAmount, setLoanAmount] = useState(0);
  const [paidloanAmount, setPaidLoanAmount] = useState(0);
  const [isChequePayment, setIsChequePayment] = useState("");
  const [ChequeBalance, setChequeBalance] = useState(0);
  const [ChequeGivenDate, setChequeGivenDate] = useState("");
  const [ChequeDueDate, setChequeDueDate] = useState("");
  const [bankDeposit, setBankDeposit] = useState("");
  const [bankName, setBankName] = useState("");
  const [depositAmount, setDepositAmount] = useState(0);
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

  useEffect(() => {
    getNetworks();
  }, []);

  useEffect(() => {
    if (user.role === "user") {
      setNetwork(user.networkId);
    }
  }, [user]);

  useEffect(() => {
    setname("");
    setAddress("");
    setEmail("");
    setPhone("");
    setNetwork("");
    setLoanAmount(0);
    setPaidLoanAmount(0);
    setIsChequePayment("");
    setChequeBalance(0);
    setChequeGivenDate("");
    setChequeDueDate("");
    setBankDeposit("");
    setBankName("");
    setDepositAmount(0);
  }, [openModal]);

  const saveCustomer = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${api_url}/api/v1/customers`,
        {
          name: name,
          email: email,
          address: address,
          phone: phone,
          networkId: network,
          loanAmount: loanAmount,
          paidloanAmount: paidloanAmount,
          isChequePayment: isChequePayment,
          ChequeBalance: ChequeBalance,
          ChequeGivenDate: ChequeGivenDate,
          ChequeDueDate: ChequeDueDate,
          bankDeposit: bankDeposit,
          bankName: bankName,
          depositAmount: depositAmount,
        },
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.msg);
      setname("");
      setAddress("");
      setEmail("");
      setPhone("");
      setNetwork("");
      setLoanAmount(0);
      setPaidLoanAmount(0);
      setIsChequePayment("");
      setChequeBalance(0);
      setChequeGivenDate("");
      setChequeDueDate("");
      setBankDeposit("");
      setBankName("");
      setDepositAmount(0);
      navigate("/customers");
      getCustomersFunc();
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
              Create New Customer
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

          <form className="p-4 md:p-5" onSubmit={saveCustomer}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <p className="text-sm text-red-600">{msg}</p>
              <div className="col-span-2">
                <label
                  for="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type Customer Name"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  for="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Address"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  for="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Phone Number"
                  required
                />
              </div>

              {user && user.role === "admin" && (
                <div className="col-span-2 ">
                  <label
                    for="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select Network
                  </label>
                  <select
                    id="category"
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

              <div className="col-span-2">
                <label
                  for="loanAmount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Loan Amount
                </label>
                <input
                  type="number"
                  name="loanAmount"
                  value={loanAmount}
                  onChange={(e) => {
                    setLoanAmount(e.target.value);
                  }}
                  id="loanAmount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Loan Amount"
                />
              </div>

              <div className="col-span-2">
                <label
                  for="paidloanAmount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Paid Loan Amount
                </label>
                <input
                  type="number"
                  name="paidloanAmount"
                  value={paidloanAmount}
                  onChange={(e) => {
                    setPaidLoanAmount(e.target.value);
                  }}
                  id="paidloanAmount"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Paid Loan Amount"
                />
              </div>

              <div className="col-span-2">
                <label
                  for="isChequePayment"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Is Cheque Payment
                </label>
                <select
                  id="isChequePayment"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={isChequePayment}
                  onChange={(e) => {
                    setIsChequePayment(e.target.value);
                  }}
                >
                  <option selected="">Is Cheque Payment</option>
                  <option value={"yes"}>Yes</option>
                  <option value={"no"}>No</option>
                </select>
              </div>

              {isChequePayment === "yes" && (
                <>
                  <div className="col-span-2">
                    <label
                      for="ChequeBalance"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Cheque Balance
                    </label>
                    <input
                      type="number"
                      name="ChequeBalance"
                      value={ChequeBalance}
                      onChange={(e) => {
                        setChequeBalance(e.target.value);
                      }}
                      id="paidloanAmount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Cheque Balance"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      for="ChequeGivenDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Cheque Given Date
                    </label>
                    <input
                      type="date"
                      name="ChequeGivenDate"
                      id="ChequeGivenDate"
                      value={ChequeGivenDate}
                      onChange={(e) => {
                        setChequeGivenDate(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Cheque Given Date"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      for="ChequeDueDate"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Cheque Due Date
                    </label>
                    <input
                      type="date"
                      name="ChequeDueDate"
                      id="ChequeDueDate"
                      value={ChequeDueDate}
                      onChange={(e) => {
                        setChequeDueDate(e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Cheque Due Date"
                    />
                  </div>
                </>
              )}

              <div className="col-span-2">
                <label
                  for="bankDeposit"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bank Deposit
                </label>
                <select
                  id="bankDeposit"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={bankDeposit}
                  onChange={(e) => {
                    setBankDeposit(e.target.value);
                  }}
                >
                  <option selected="">Is Bank Deposit</option>
                  <option value={"yes"}>Yes</option>
                  <option value={"no"}>No</option>
                </select>
              </div>

              {bankDeposit === "yes" && (
                <>
                  <div className="col-span-2">
                    <label
                      for="ChequeBalance"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bankName"
                      value={bankName}
                      onChange={(e) => {
                        setBankName(e.target.value);
                      }}
                      id="bankName"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Bank Name"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      for="depositAmount"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Deposit Amount
                    </label>
                    <input
                      type="number"
                      name="depositAmount"
                      value={depositAmount}
                      onChange={(e) => {
                        setDepositAmount(e.target.value);
                      }}
                      id="depositAmount"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Deposit Amount"
                    />
                  </div>
                </>
              )}

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
              Add new Customer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCustomerForm;
