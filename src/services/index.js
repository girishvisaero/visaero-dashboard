import axios, { noConfig } from "../config/axios";

export const getEnterPriseAccount = ({ signal }) => {
  return axios.get("/enterprise-admin/getEnterpriseAccountsHostDetails", {
    signal,
    params: {
      domain_host: window.location.hostname,
    },
  });
};

export const getNotifications = ({ signal }) => {
  return axios.get("/visa-admin/getAppNotifications", {
    signal,
    params: {
      host: localStorage.getItem("host"),
      user_id: localStorage.getItem("user_id"),
    },
  });
};

export const verifySession = async ({ signal }) => {
  let session_id = localStorage.getItem("session_id");
  let user_id = localStorage.getItem("user_id");
  // console.log("session_id", session_id);
  return axios.post(
    "/user-admin/verifyAdminUserSession",
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
  console.log("mutate data ", data);
  return noConfig.post("user-admin/login", data);
};
