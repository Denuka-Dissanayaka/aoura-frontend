import ThemeContextProvider from "./context/ThemeContextProvider";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import Panel from "./panel/Panel";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import NetworksPage from "./pages/NetworksPage";
import StaffsPage from "./pages/StaffsPage";
import CustomerPage from "./pages/CustomerPage";
import OrderPage from "./pages/OrderPage";
import ExpensePage from "./pages/ExpensePage";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeContextProvider>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/products" element={<ProductsPage />}></Route>
          <Route path="/users" element={<UsersPage />}></Route>
          <Route path="/networks" element={<NetworksPage />}></Route>
          <Route path="/staff" element={<StaffsPage />}></Route>
          <Route path="/customers" element={<CustomerPage />}></Route>
          <Route path="/orders" element={<OrderPage />}></Route>
          <Route path="/expenses" element={<ExpensePage />}></Route>
          {/* <Panel /> */}
          {/* <LoginPage /> */}
        </Routes>
        <ToastContainer theme="dark" />
      </ThemeContextProvider>
    </BrowserRouter>
  );
}

export default App;
