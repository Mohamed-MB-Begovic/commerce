import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './App.css'
// customer pages
import Kids  from './pages/Kids.jsx'
import Men from './pages/Men.jsx'
import Womens from './pages/Womens.jsx'
import Checkout from './pages/Checkout.jsx'
import UserOrders from './pages/UserOrders.jsx'
import OrderDetails from './pages/OrderDetails.jsx'
import ThankYouMessage from './pages/ThankYouMessage.jsx'
import EditProfile from './pages/EditProfile.jsx'

 
import Collections from './pages/Collections.jsx'
// developer pages
import SignIn from './pages/SignIn.jsx'
import Signup from './pages/Signup.jsx'
import AboutUs from './pages/AboutUs.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ContextProvider } from './context/UserContext.jsx'
import { OrderProvider } from './context/OrderContext.jsx'
import PageNotFound from "./pages/PageNotFound.jsx";

// admin pages
import Home from './admin/Home.jsx'
import Payments from '../src/admin/pages/Payments.jsx'
import Orders from '../src/admin/pages/Orders.jsx'
import Reports from '../src/admin/pages/Reports.jsx'
import Settings from '../src/admin/pages/Settings.jsx'
import Sales from '../src/admin/pages/Sales.jsx'
import MainPage from './pages/MainPage.jsx'
import Products from './admin/pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import ViewProducts from './admin/pages/ViewProducts.jsx'
import Dashbord from './admin/pages/Dashbord.jsx'
import { ShopProvider } from './context/Context.jsx'



const router=createBrowserRouter([
  {
    path:'/',
    element:<MainPage/>,
  },
  // user routes
 {
  path:'/user',
  element:<App/>,  
  children:[
    {
      path:'men',
      element:<Men/>
    },
    {
      path:'womens',
      element:<Womens/>
    },
    {
      path:"kids",
      element:<Kids/>
    }
    ,
    {
      path:"collections",
      element:<Collections/>
    },
    {
      path:'about',
      element:<AboutUs/>
    },
    {
      path:"edit-profile",
      element:<EditProfile/>
    },
  
    {
      path:"orders",
      element:<UserOrders/>
    },
    {
      path:"order/:id",
      element:<OrderDetails/>
    },
  
    {
      path:'product/:id',
      element:<ProductDetails/>
    },
    {
      path:'cart',
      element:<Cart/>
    },
    {
      path:'cart/order',
      element:<Checkout/>
    },
    {
      path:'order/confirm-order',
      element:<ThankYouMessage/>
    }
  ]
 },
//  admin routes
  {
    path:'/admin',
    element:<Home/>,
    children:[
      {
        element:<Dashbord/>,
        index:true
      },
      {
        path:'payment',
        element:<Payments/>
      },
      {
        path:'products',
        element:<Products/>
      },
      {
        path:'products/add',
        element:<Products/>
      },
      {
        path:'products/view',
        element:<ViewProducts/>
      },
      
      {
        path:'report',
        element:<Reports/>
      },
      {
        path:'orders',
        element:<Orders/>
      },
      {
        path:'sales',
        element:<Sales/>
      },
      {
        path:'setting',
        element:<Settings/>
      }
      
      
    ]
  },

  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:"/signin",
    element:<SignIn/>
  },
  { path: "*", element: <PageNotFound /> },

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderProvider>
    <ShopProvider>
    <ContextProvider>
  <Toaster/>
 <RouterProvider router={router}/>
    </ContextProvider> 
    </ShopProvider>
    </OrderProvider>

  </StrictMode>,
)
