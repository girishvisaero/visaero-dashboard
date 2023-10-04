import { Box, Grid, Image, Text, Transition } from "@mantine/core";
import React, { useMemo, useState } from "react";
import LoginCard from "./LoginCard";
import ForgotPassword from "./ForgotPassword";

const Login = () => {
  const [isForgotPass, setIsForgotPass] = useState(true);

  const handleIsForgotPass = () => setIsForgotPass((prev) => !prev);

  return (
    <Box sx={{overflow:'hidden'}}>
      <Grid m={0} h={"100vh"}>
        <Image
          src="https://cp-vi-stage.visaero.com/static/media/organization_register_bg.2edc1a31.png"
          height="100vh"
          pos="absolute"
          sx={{ zIndex: -1 }}
        />
        <Grid.Col
          span={8}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          p={0}
        ></Grid.Col>
        <Grid.Col
          span={4}
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
          px="lg"
          bg="#ffffffa1"
          pos="relative"
        >
          <Box>
            <Image
              height={100}
              width={100}
              src="https://visa-stage.visaero.com/images/logo.png"
            />
          </Box>
          <Box
            w="100%"
            h="100%"
            pos="absolute"
            top={0}
            p="xl"
            display="flex"
            sx={{
              alignItems: "center",
              // flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Transition
              mounted={isForgotPass}
              transition="fade"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Box w="100%" miw={"100%"} style={styles}>
                  <LoginCard handleIsForgotPass={handleIsForgotPass} />
                </Box>
              )}
            </Transition>
            <Transition
              mounted={!isForgotPass}
              transition="fade"
              duration={400}
              timingFunction="ease"
            >
              {(styles) => (
                <Box w="100%" miw={"100%"} style={styles}>
                  <ForgotPassword handleIsForgotPass={handleIsForgotPass} />
                </Box>
              )}
            </Transition>
          </Box>
          <Box
            sx={{ transform: "translate(-50%)" }}
            left={"50%"}
            pos="absolute"
            bottom={0}
          >
            <Text>
              Powered by{" "}
              <Text component="span" color="brand">
                Visaero
              </Text>
            </Text>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Login;
