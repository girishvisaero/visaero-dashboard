import axios, { noConfig } from "../config/axios";
import * as API from "./apis";

export const getEnterPriseAccount = ({ signal }) => {
  return axios.get(API.getEnterpriseAccountHostDetails, {
    signal,
    params: {
      // domain_host:  window.location.hostname,
      domain_host: "cp-att-stage.visaero.com",
    },
  });
};

export const getNewsAndUpdates = ({ signal }) => {
  return axios.post(API.getNewsAndUpdates, {
    user_id: localStorage.getItem("user_id"),
  });
};
export const getNotifications = ({ signal }) => {
  return axios.get(API.getNotification, {
    signal,
    params: {
      host: localStorage.getItem("host"),
      user_id: localStorage.getItem("user_id"),
    },
  });
};

export const getDashboardData = ({ queryKey }) => {
  const [_, dates] = queryKey;
  // console.log("querykey", dates);
  const start_date = dates[0];
  const end_date = dates[1];

  return axios.post(
    API.getNewDashboard,
    // signal,
    {
      host: localStorage.getItem("host"),
      user_id: localStorage.getItem("user_id"),
      start_date,
      end_date,
    }
  );
};

export const verifySession = async ({ signal }) => {
  let session_id = localStorage.getItem("session_id");
  let user_id = localStorage.getItem("user_id");
  // console.log("session_id", session_id);
  return axios.post(
    API.verifyAdminUserSession,
    {
      session_id,
      user_id,
    },
    {
      signal,
    }
  );
};

export const loginService = async (data) => {
  return noConfig.post(API.login, data);
};
