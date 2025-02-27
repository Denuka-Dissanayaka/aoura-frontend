import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditSupplierForm({
  openEditModal,
  setOpenEditModal,

  setEditSupplierId,
  editSupplierId,
}) {
  const api_url = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");

  const [productPrice, setProductPrice] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [balance, setBalance] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankName, setBankName] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const getSupplierById = async () => {
    if (editSupplierId !== null) {
      try {
        const response = await axios.get(
          `${api_url}/api/v1/suppliers/${editSupplierId}`,
          {
            headers: {
              "access-token": localStorage.getItem("token"),
            },
            withCredentials: true,
          }
        );
        setName(response.data.uuid);
        setEmail(response.data.email);
        setProductName(response.data.productName);
        setProductPrice(response.data.productPrice);
        setLoanAmount(response.data.loan);
        setBankName(response.data.bank);
        setPaidAmount(response.data.paidAmount);
        setPaymentMethod(response.data.paymentMethod);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.msg);
        }
      }
    }
  };

  useEffect(() => {
    getSupplierById();
  }, [editSupplierId]);

  const updateStaff = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.patch(
        `${api_url}/api/v1/suppliers/${editSupplierId}`,
        {
          name,
          email,
          productName,
          productPrice,
          loanAmount,
          paidAmount,
          balance,
          paymentMethod,
          bankName,
        },
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      toast.success(result.data.msg);
      //navigate("/staff");
      //getStaffsFunc();
      setOpenEditModal(false);
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
        openEditModal ? "" : "hidden"
      } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-70`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Update Supplier
            </h3>
            <button
              onClick={() => {
                setOpenEditModal(false);
                setEditSupplierId(null);
              }}
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

          <form className="p-4 md:p-5" onSubmit={""}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <p className="text-sm text-red-600">{msg}</p>
              <div className="col-span-2">
                <label
                  for="fristname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="fristname"
                  id="fristname"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type name"
                  required
                />
              </div>
              <div className="col-span-2">
                <label
                  for="lastname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Type email"
                />
              </div>
              <div className="col-span-2">
                <label
                  for="nic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  name="nic"
                  id="nic"
                  value={productName}
                  onChange={(e) => {
                    setProductName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product name"
                />
              </div>

              <div className="col-span-2">
                <label
                  for="nic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Product Price
                </label>
                <input
                  type="number"
                  name="nic"
                  id="nic"
                  step={0.01}
                  value={productPrice}
                  onChange={(e) => {
                    setProductPrice(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Product price"
                />
              </div>

              <div className="col-span-2">
                <label
                  for="nic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Loan Amount
                </label>
                <input
                  type="number"
                  name="nic"
                  id="nic"
                  step={0.01}
                  value={loanAmount}
                  onChange={(e) => {
                    setLoanAmount(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Loan Amount"
                />
              </div>
              <div className="col-span-2">
                <label
                  for="nic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Paid Amount
                </label>
                <input
                  type="number"
                  name="nic"
                  id="nic"
                  step={0.01}
                  value={paidAmount}
                  onChange={(e) => {
                    setPaidAmount(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Paid Amount"
                />
              </div>

              <div className="col-span-2">
                <label
                  for="nic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Balance
                </label>
                <input
                  type="number"
                  name="nic"
                  id="nic"
                  step={0.01}
                  value={balance}
                  onChange={(e) => {
                    setBalance(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Balance"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label
                  for="Gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select Payment Method
                </label>
                <select
                  id="Gender"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  value={paymentMethod}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                  }}
                >
                  <option selected="">Select Method</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                  <option value="bank_deposit">Bank Deposit</option>
                </select>
              </div>

              <div className="col-span-2">
                <label
                  for="nic"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  name="nic"
                  id="nic"
                  value={bankName}
                  onChange={(e) => {
                    setBankName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Bank name"
                />
              </div>
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
              Update Supplier
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditSupplierForm;
