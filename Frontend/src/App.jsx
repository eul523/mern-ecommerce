import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { useEffect } from "react";
import useAuthStore from "./stores/AuthStore.js";
import Layout from "./components/Layout";
import Home, { loader as homeLoader } from "./pages/Home.jsx";
import CreateProduct from "./pages/CreateProduct.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ProtectRoute from "./components/ProtectRoute.jsx";
import ProductDetail, {loader as PDLoader} from './pages/ProductDetail.jsx';
import Cart from "./pages/Cart.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";
import OrdersPage, {loader as ordersLoader} from "./pages/Orders.jsx";
import CategoriesPage, {loader as categoriesLoader} from "./pages/Categories.jsx";
import About from "./pages/About.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: homeLoader
      },
      {
        element: <ProtectRoute />,
        children: [
          {
            path: '/create-product',
            element: <CreateProduct />
          },
        ]
      },

      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/product/:id',
        loader: PDLoader,
        element: <ProductDetail />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/success',
        element: <Success />
      },
      {
        path: '/cancel',
        element: <Cancel />
      },
      {
        path: '/orders',
        loader: ordersLoader,
        element: <OrdersPage />
      },
      {
        path: '/category/:category',
        loader: categoriesLoader,
        element: <CategoriesPage />
      },
      {
        element: <About />,
        path: '/about'
      }
    ]
  }
])


function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
