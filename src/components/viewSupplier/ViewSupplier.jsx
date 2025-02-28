import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ViewSupplier({ openViewModal, setOpenViewModal, viewSupplierId }) {
  const api_url = import.meta.env.VITE_API_URL;

  const [name, setName] = useState("");
  const [uuid, setUuid] = useState("");
  const [email, setEmail] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [loan, setLoan] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankName, setBankName] = useState("");
  const [createDate, setCreateDate] = useState("");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getSupplier = async () => {
    try {
      const response = await axios.get(
        `${api_url}/api/v1/suppliers/${viewSupplierId}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );

      setUuid(response.data.uuid);
      setName(response.data.name);
      setEmail(response.data.email);
      setProductName(response.data.productName);
      setProductPrice(response.data.productPrice);
      setLoan(response.data.loanAmount);
      setPaidAmount(response.data.paidAmount);
      setBalance(response.data.balance);
      setPaymentMethod(response.data.paymentMethod);
      setBankName(response.data.bankName);
      setCreateDate(response.data.createdAt);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        toast.error(error.response.data.msg);
      }
    }
  };

  //console.log(network);
  useEffect(() => {
    setName("");
    setUuid("");
    setEmail("");
    setProductName("");
    setProductPrice("");
    setLoan("");
    setPaidAmount("");
    setBalance("");
    setPaymentMethod("");
    setBankName("");
    setBankName("");
    setCreateDate("");
    getSupplier();
  }, [viewSupplierId]);

  return (
    <div
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      className={`${
        openViewModal ? "" : "hidden"
      } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-70`}
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Supplier Info
            </h3>
            <button
              onClick={() => setOpenViewModal(false)}
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

          <div className="p-4">
            <div className="m-2">
              <p className="font-semibold text-lg">Name :</p>
              <p>{`${name}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Supplier ID :</p>
              <p>{`${uuid}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Email :</p>
              <p>{`${email}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Product Name :</p>
              <p>{`${productName}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Product Price :</p>
              <p>{`${productPrice}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Loan Amount :</p>
              <p>{`${loan}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Paid Amount :</p>
              <p>{`${paidAmount}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Balance :</p>
              <p>{`${balance}`}</p>
            </div>
            <div className="m-2">
              <p className="font-semibold text-lg">Payment Method :</p>
              <p>{`${paymentMethod}`}</p>
            </div>
            {paymentMethod === "bank_deposit" && (
              <div className="m-2">
                <p className="font-semibold text-lg">Bank Name :</p>
                <p>{`${bankName}`}</p>
              </div>
            )}

            <div className="m-2">
              <p className="font-semibold text-lg">Created Date :</p>
              <p>{`${createDate}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewSupplier;
