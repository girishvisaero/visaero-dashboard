import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import theme from "./config/theme.js";
import useNetworkHandler from "./hooks/useNetworkProvider.jsx";
import router from "./routes/router.jsx";
import { useEnterpriseAccount } from "./services/globelState.js";
import { setupTheme } from "./lib/utils.js";

const App = () => {
  let network = useNetworkHandler();
  const { data } = useEnterpriseAccount();

  setupTheme(
    data?.data?.dataobj?.brand_color,
    data?.data?.dataobj?.secondary_color
  );

  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Notifications limit={1} position="top-right" />
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </>
  );
};

export default App;
