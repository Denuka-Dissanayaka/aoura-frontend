import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import Invoice2 from "../invoice/Invoice2";

function ViewOrder({ openViewModal, setOpenViewModal, viewOrderId, id }) {
  const api_url = import.meta.env.VITE_API_URL;

  const [openInvoiceModal, setOpenInvoiceModal] = useState(false);

  const [productName, setProductName] = useState("");
  const [customer, setCustomer] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total, setTotal] = useState("");
  const [status, setStatus] = useState("");
  const [network, setNetwork] = useState("");
  const [uuid, setUuid] = useState("");
  const [createDate, setCreateDate] = useState("");

  const forInvoice = {
    id: viewOrderId,
    productName,
    customer,
    customerEmail,
    customerPhone,
    quantity,
    total,
  };

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getOrder = async () => {
    try {
      const response = await axios.get(
        `${api_url}/api/v1/orders/${viewOrderId}`,
        {
          headers: {
            "access-token": localStorage.getItem("token"),
          },
          withCredentials: true,
        }
      );
      setProductName(response.data.product.name);
      setCustomer(response.data.customer.name);
      setCustomerEmail(response.data.customer.email);
      setCustomerPhone(response.data.customer.phone);
      setQuantity(response.data.quantity);
      setStatus(response.data.status);
      setTotal(response.data.price);
      setNetwork(response.data.network.name);
      setUuid(response.data.uuid);
      setCreateDate(response.data.createdAt);
    } catch (error) {
      if (error.response) {
        //setMsg(error.response.data.msg);
        //toast.error(error.response.data.msg);
        console.log(error.response.data.msg);
      }
    }
  };

  //console.log(network);
  useEffect(() => {
    setProductName("");
    setCustomer("");
    setCustomerEmail("");
    setCustomerPhone("");
    setQuantity("");
    setStatus("");
    setTotal("");
    setNetwork("");
    setUuid("");
    setCreateDate("");
    getOrder();
  }, [viewOrderId]);

  return (
    <>
      <Invoice2
        openInvoiceModal={openInvoiceModal}
        setOpenInvoiceModal={setOpenInvoiceModal}
        invoiceDetails={forInvoice}
      />

      <div
        id="crud-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`${
          openViewModal ? "" : "hidden"
        } overflow-y-auto flex overflow-x-hidden fixed top-0 right-0 left-0 z-30 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-70`}
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {`Order Info ${id}`}
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
                <p className="font-semibold text-lg">Product Name :</p>
                <p>{`${productName}`}</p>
              </div>
              <div className="m-2">
                <p className="font-semibold text-lg">Order ID :</p>
                <p>{`${uuid}`}</p>
              </div>
              <div className="m-2">
                <p className="font-semibold text-lg">Customer Name :</p>
                <p>{`${customer}`}</p>
              </div>
              <div className="m-2">
                <p className="font-semibold text-lg">Customer Email :</p>
                <p>{`${customerEmail}`}</p>
              </div>
              <div className="m-2">
                <p className="font-semibold text-lg">Customer Phone :</p>
                <p>{`${customerPhone}`}</p>
              </div>
              <div className="m-2">
                <p className="font-semibold text-lg">Status :</p>
                <p>{`${status}`}</p>
              </div>
              <div className="m-2">
                <p className="font-semibold text-lg">Quantity :</p>
                <p>{`${quantity}`}</p>
              </div>
              <div className="m-2">
                <p className="font-semibold text-lg">Total :</p>
                <p>{`${total}`}</p>
              </div>
              <div className="m-2">
                <p className="font-semibold text-lg">Network :</p>
                <p>{`${network}`}</p>
              </div>
              <div className="m-2">
                <p className="font-semibold text-lg">Created Date :</p>
                <p>{`${createDate}`}</p>
              </div>
              <div className="m-2">
                {/* <Link
                to={`/invoice/${viewOrderId}`}
                target="_blank"
                className="inline-block bg-amber-500 p-4 mt-2 font-semibold"
              >
                Generate Invoice
              </Link> */}
                <button
                  onClick={() => {
                    setOpenInvoiceModal(true);
                  }}
                  className="inline-block bg-amber-500 p-4 mt-2 font-semibold"
                >
                  Generate Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewOrder;
