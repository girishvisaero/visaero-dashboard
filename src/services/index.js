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

export const getDashboardData = ({ queryKey }) => {
  const [_, dates] = queryKey;
  // console.log("querykey", dates);
  const start_date = dates[0];
  const end_date = dates[1];

  const isValidDates = !start_date || !end_date || start_date == "Invalid Date" || end_date == "Invalid Date";

  return axios.post(
    "/visa-admin/getNewDashboardData",
    // signal,
    {
      host: localStorage.getItem("host"),
      user_id: localStorage.getItem("user_id"),
      start_date,
      end_date,
      // end_date: "2023-09-11T13:43:37.380Z",
      // start_date: "2023-09-01T13:43:37.380Z",
    }
  );
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
