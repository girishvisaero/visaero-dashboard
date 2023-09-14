import {
  AppShell,
  Box,
  Image,
  LoadingOverlay,
  Navbar,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Logo from "../assets/visaeroLogo.png";
import MainLinks, { User } from "../components/MainLinks";
import {
  useEnterpriseAccount,
  useGloblePermission,
} from "../services/globelState";

const Layout = () => {
  const navigate = useNavigate();
  const { isLoading, data } = useEnterpriseAccount();
  const permission = useGloblePermission(data?.data);

  const theme = useMantineTheme();
  // console.log('pathname', location.pathname)

  // window.addEventListener('click',()=>{
  //   permission.refetch()
  // })

  useEffect(() => {
    let isSessionVerified = permission?.data?.data.data === "success";
    if ((permission?.data && !isSessionVerified) || !localStorage.getItem('session_id')) {
      navigate("/login");
      localStorage.removeItem("session_id")
    }
  }, [permission]);

  return (
    <>
      <Box>
        <LoadingOverlay visible={isLoading} overlayBlur={2} />
        <AppShell
          styles={{
            main: {
              background:
                theme.colors.gray[0] || theme.colors.secondary_color[0],
            },
          }}
          navbarOffsetBreakpoint="sm"
          asideOffsetBreakpoint="sm"
          navbar={
            <Navbar p="xs" width={{ base: 300 }}>
              <Navbar.Section
                sx={{
                  borderBottom: `${rem(1)} solid ${theme.colors.gray[2]}`,
                }}
                p="sm"
              >
                <Box
                  sx={{
                    display: "flex",
                    gap: 15,
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={Logo}
                    height={50}
                    width={50}
                    fit="contain"
                    // sx={{ objectFit: "contain" }}
                  />
                  {/* <IconUserCircle fill={theme.colors.gray[2]} strokeWidth={'1px'} height='50px' width='50px' /> */}
                  {/* <Text component="h2" m={0} >Girish Chaudhari</Text> */}
                  {/* <Box
                    sx={{ display: "flex", justifyContent: "center" }}
                    mt="sm"
                  >
                    <Box>
                      <Text color="dimmed" size="xs" align="center">
                        Version 1.2.0
                      </Text>
                      <Text
                        size="sm"
                        weight={500}
                        align="center"
                        color={theme.primaryColor}
                      >
                        Powered By Visaero
                      </Text>
                    </Box>
                  </Box> */}
                </Box>
              </Navbar.Section>
              <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
                <Box py="md">
                  <MainLinks />
                </Box>
              </Navbar.Section>
              <Navbar.Section>
                <User />
              </Navbar.Section>
            </Navbar>
          }
        >
          <Outlet />
        </AppShell>
      </Box>
    </>
  );
};

export default Layout;
