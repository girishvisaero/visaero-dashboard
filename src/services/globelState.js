import { useQuery } from "@tanstack/react-query";
import { getEnterPriseAccount, verifySession } from ".";

export const useEnterpriseAccount = () => {
  return useQuery({
    queryKey: ["enterprise-account"],
    queryFn: getEnterPriseAccount,
  });
};

export const useGloblePermission = (data) => {
  // console.log("data", data);
  return useQuery({
    enabled: !!data?.data && data?.data === "success",
    queryKey: ["permissions"],
    // staleTime: 1000,
    refetchOnWindowFocus: 'always',
    queryFn: verifySession,
  });
};
