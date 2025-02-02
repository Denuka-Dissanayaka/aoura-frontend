import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { Blocks } from "react-loader-spinner";

function Cashbook() {
  const api_url = import.meta.env.VITE_API_URL;

  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Cashbook</h2>

      <div>
        <div className="grid grid-cols-4 gap-2">
          <div className="p-2">
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              iusto dolore rerum corporis fugiat consequatur quod molestias,
              earum quos temporibus?
            </p>
            <div>
              <button className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded">
                {" "}
                View Details
              </button>
              <button className="bg-dark-purple dark:bg-gray-800 hover:bg-dark-purple-[300] text-white font-bold py-2 px-4 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cashbook;
