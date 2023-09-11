import { Navigate, createBrowserRouter } from "react-router-dom";
import ClientError from "../components/AppCrash";
import Layout from "../layout/Layout";
import NoLayout from "../layout/NoLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import DocumentRuleEngine from "../pages/documentRuleEngine/DocumentRuleEngine";
import PageNotFound from "../pages/errors/PageNotFound";
import Login from "../pages/login/Login";
import Notifications from "../pages/notifications/Notifications";
import VisaOffers from "../pages/visaOfferConfig/VisaOffers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement:<ClientError />,
    children: [
      {
        index: true,
        path: "/",
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        index: true,
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/new-visa",
        element: <>New Visa</>,
      },
      {
        path: "/track-visa",
        element: <>Track Visa</>,
      },
      {
        path: "/document-rule-engine",
        element: <DocumentRuleEngine />,
      },
      {
        path: "/visa-offers",
        element: <VisaOffers />,
      },
    ],
  },
  {
    path: "/",
    element: <NoLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
  { path: "/*", element: <PageNotFound /> },
]);

export default router;
