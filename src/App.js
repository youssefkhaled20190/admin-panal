import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginSignup from "./pages/AuthPage/FullAuth.js";
// import SideBar from "./Components/SideBar/SideBar.js";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Products from "./pages/Products/AddProduct.js";
import ProtectedRoute from "./Components/Authentication/Auth.js";
import AuthenticatedLayout from "./Components/Authentication/AuthLayout.js";
import AddCategory from "./pages/Categories/AddCategory.js";
function App() {
  return (
    <BrowserRouter> 
        <Routes>
          <Route path="/login" element={<LoginSignup />}></Route>
          <Route element={<ProtectedRoute element={AuthenticatedLayout} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/Catgories" element={<AddCategory/>} />

          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
