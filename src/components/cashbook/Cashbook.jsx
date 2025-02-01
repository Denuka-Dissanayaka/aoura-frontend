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
    </div>
  );
}

export default Cashbook;
