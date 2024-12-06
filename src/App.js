import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./pages/AuthPage/FullAuth.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Products from "./pages/Products/AddProduct.js";
import ProtectedRoute from "./Components/Authentication/Auth.js";
import AuthenticatedLayout from "./Components/Authentication/AuthLayout.js";
import AddCategory from "./pages/Categories/AddCategory.js";
import NavBar from "./Components/NavBar/NavBar.js";
import Auth from "./pages/AuthPage/FullAuth.js";
import RateTable from "./pages/Rates/RatesTable.js";
import PaymentTable from "./pages/Payments/Payments.js";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/Catgories" element={<AddCategory />} />
          <Route path="/Rates" element={<RateTable />} />
          <Route path="/Payments" element={<PaymentTable />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
