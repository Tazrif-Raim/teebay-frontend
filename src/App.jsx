import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Registration from "./pages/Registration"
import UserProduct from "./pages/UserProduct"
import EditProduct from "./pages/EditProduct"
import UserProductTransaction from "./pages/UserProductTransaction"
import CreateProduct from "./pages/CreateProduct"
import PublicAllAvailableProduct from "./pages/PublicAllAvailableProduct"
import ProductDescTrans from "./pages/ProductDescTrans"
import { useAuth } from "./hooks/useAuth"
import Footer from "./components/common/Footer"



function App() {

  const { isAuthenticated } = useAuth();

  return (
    <>
      <div>
        {/*isAuthenticated ? <LoggedInHeader /> : <PublicHeader />*/}
        <Routes>
          <Route strict exact path="/" element={<Home />} />
          <Route strict exact path="/login" element={<Login />} />
          <Route strict exact path="/Registration" element={<Registration />} />
          <Route strict exact path="/user/product" element={<UserProduct />} />
          {/*<Route strict exact path="/user/product/:id" element={<UserProductDetail />} />*/}
          <Route strict exact path="/user/product/:id/edit" element={<EditProduct />} />
          <Route strict exact path="/user/product/transaction" element={<UserProductTransaction />} />
          <Route strict exact path="/user/product/create" element={<CreateProduct />} />
          <Route strict exact path="/product" element={<PublicAllAvailableProduct />} />
          <Route strict exact path="/product/:id" element={<ProductDescTrans />} />

        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
