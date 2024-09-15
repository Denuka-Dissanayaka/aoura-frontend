import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Panel from "../panel/Panel";

//import Orders from "../components/orders/Orders";
import Expenses from "../components/expenses/Expenses";
import { getMe } from "../features/authSlice";

function ProductsPage() {
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
      <Expenses />
    </Panel>
  );
}

export default ProductsPage;
