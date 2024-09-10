import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Panel from "../panel/Panel";

import Customer from "../components/customers/Customers";
import { getMe } from "../features/authSlice";

function CustomerPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Panel>
      <Customer />
    </Panel>
  );
}

export default CustomerPage;
