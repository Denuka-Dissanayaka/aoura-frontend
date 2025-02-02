import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";

import ViewCashbookOrder from "../viewCashbookOrder/ViewCashbookOrder";

function Cashbook() {
  const api_url = import.meta.env.VITE_API_URL;

  const [cashbookRecords, setCashbookRecords] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [recordId, setRecordId] = useState(false);

  useEffect(() => {
    getCashbookRecords();
  }, []);

  const getCashbookRecords = async () => {
    //setLoading(true);
    try {
      const response = await axios.get(`${api_url}/api/v1/cashbook`, {
        headers: {
          "access-token": localStorage.getItem("token"),
        },
        withCredentials: true,
      });

      setCashbookRecords(response.data.response);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.msg);
      }
    }
  };

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Cashbook</h2>

      <ViewCashbookOrder
        openViewModal={openViewModal}
        setOpenViewModal={setOpenViewModal}
        recordId={recordId}
      />

      <div>
        <div className="grid grid-cols-4 gap-2">
          {cashbookRecords.map((record, i) => (
            <div className="p-3 bg-gray-800 rounded-md" key={i}>
              <p className="font-semibold text-lg">{record.description}</p>
              <p className="mt-1 text-green-500">{` Date: ${record.date}`}</p>
              <div className="flex items-center justify-between mt-2">
                <button
                  className=" bg-amber-500 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setOpenViewModal(true);
                    setRecordId(record.recordID);
                  }}
                >
                  {" "}
                  View Details
                </button>
                <button className="bg-red-600 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cashbook;
