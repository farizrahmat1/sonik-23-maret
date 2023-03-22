import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Report from "./pages/report/Report";
import CsMenu from "./pages/chargingstation/CsMenu";
import Activity from "./pages/activity/Activity";
import Customer from "./pages/customer/Customer";
import Transaction from "./pages/transaction/Transaction";
import AddCs from "./pages/add/AddCs";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UpdateCs from "./pages/update/UpdateCs";
import AddCustomer from "./pages/add/AddCustomer";
import UpdateCustomer from "./pages/update/UpdateCustomer";
import Register from "./pages/register/Register";
import DetailCS from "./pages/detailCS/DetailCS";
import PieChartReport from "./pages/report/PieChartReport";
import Warning from "./pages/warning/Warning";
import TransactionFilter from "./pages/transaction/TransactionFilter";
import DetailCustomer from "./pages/detailCustomer/DetailCustomer";
import { AuthContext } from "./context/authContext";
import { useContext, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
  Navigate,
} from "react-router-dom";
import ReportFilteredPage from "./pages/report/ReportFilteredPage";
import Logout from "./pages/logout/Logout.jsx";
import RegisterAdmin from "./pages/registerAdmin/RegisterAdmin";
import CsMenuClient from "./pages/chargingstationClient/CsMenuClient";

function App() {
  const ProtectedRoute = ({ children }) => {
    if (!localStorage.getItem("token")) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      ),
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "logout",
      element: <Logout />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "chargingstation",
      element: <CsMenu />,
    },
    {
      path: "chargingStationClient",
      element: <CsMenuClient />,
    },
    {
      path: "detailCS/:id",
      element: <DetailCS />,
    },
    {
      path: "addcs",
      element: <AddCs />,
    },
    {
      path: "update/:id",
      element: <UpdateCs />,
    },
    {
      path: "transaction",
      element: <Transaction />,
    },
    {
      path: "transactionFilter",
      element: <TransactionFilter />,
    },
    {
      path: "warning",
      element: <Warning />,
    },
    {
      path: "activity",
      element: <Activity />,
    },
    {
      path: "report",
      element: <Report />,
    },
    {
      path: "reportFilter",
      element: <ReportFilteredPage />,
    },
    {
      path: "customer",
      element: <Customer />,
    },
    {
      path: "addcustomer",
      element: <AddCustomer />,
    },
    {
      path: "updatecustomer/:id",
      element: <UpdateCustomer />,
    },
    {
      path: "detailCustomer/:id",
      element: <DetailCustomer />,
    },
    {
      path: "registerAdmin",
      element: <RegisterAdmin />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

{
  /* <div className="App">
<BrowserRouter>
  <Routes>
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="chargingstation" element={<CsMenu />} />
      <Route path="detailCS/:id" element={<DetailCS />} />
      <Route path="addcs" element={<AddCs />} />
      <Route path="update/:id" element={<UpdateCs />} />
      <Route path="transaction" element={<Transaction />} />
      <Route path="transactionFilter" element={<TransactionFilter />} />
      <Route path="warning" element={<Warning />} />
      <Route path="activity" element={<Activity />} />
      <Route path="report" element={<Report />} />
      <Route path="piereport" element={<PieChartReport />} />
      <Route path="customer" element={<Customer />} />
      <Route path="addcustomer" element={<AddCustomer />} />
      <Route path="updatecustomer/:id" element={<UpdateCustomer />} />
      <Route path="detailCustomer/:id" element={<DetailCustomer />} />
    </Route>
  </Routes>
</BrowserRouter>
</div> */
}
