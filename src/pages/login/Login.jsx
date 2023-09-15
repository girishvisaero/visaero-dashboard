import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Divider,
  Grid,
  Image,
  PasswordInput,
  Text,
  TextInput,
  useMantineTheme
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as z from "zod";
import { hash } from "../../lib/utils";
import { loginService } from "../../services";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const FormSchema = z.object({
  mobile_no: z
    .string()
    .nonempty("Mobile number is required")
    .regex(phoneRegExp, "Mobile number is not valid")
    // .min(4, { message: "Mobile number must be 5 characters or more" })
    .max(10, { message: "Mobile number must be 14 characters or less" }),
  password: z.string().nonempty("Password is required"),
});

const Login = () => {
  const queryClient = useQueryClient();

  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: { mobile_no: "9021929562", password: "Smart@123" },
  });

  const { mutate, isLoading } = useMutation(loginService, {
    onSuccess: ({ data }) => {
      // console.log(data);
      if (data.data === "success") {
        queryClient.invalidateQueries("permissions");
        localStorage.setItem("session_id", data.dataobj?.session_id);
        localStorage.setItem("user_id", data.dataobj?._id);
        localStorage.setItem("host", data.dataobj?.host);
        navigate("/");
      } else {
        notifications.show({
          title: "Error",
          color: "red",
          autoClose: 3000,
          message: data?.msg,
        });
      }
    },
    onError:()=>{}
  });

  const onSubmit = async (data) => {
    let hash_pass = await hash(data.password);
    data.password = hash_pass;
    data.host = "visaero";
    // console.log(hash_pass);
    mutate(data);
    // console.log(data);
  };

  return (
    <div>
      <Grid m={0} h={"100vh"}>
        <Image
          src="https://cp-vi-stage.visaero.com/static/media/organization_register_bg.2edc1a31.png"
          // src="https://cp-vi-stage.visaero.com/static/media/visaero_login.8f5bea3d.png"
          height="100vh"
          pos="absolute"
          sx={{ zIndex: -1 }}
        />
        <Grid.Col
          span={8}
          // bg={theme.colors.gray[0]}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          p={0}
        >
          {/* <Image
            src="https://visa-stage.visaero.com/images/logo.png"
            height="250px"
            width="250px"
            sx={{ borderRadius: "sm" }}
          /> */}
        </Grid.Col>
        <Grid.Col
          span={4}
          sx={{
            width: "100%",
            display: "flex",
            // justifyContent: "space-between",
            flexDirection: "column",
            alignItems: "center",
            gap: 30,
          }}
          px="lg"
          bg="#ffffffa1"
          pos="relative"
          // bg={theme.colors.gray[3]}
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
            sx={{ alignItems: "center" }}
          >
            <Box
              bg="#fff"
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              p={15}
              sx={{
                boxShadow: theme.shadows.md,
                borderRadius: theme.radius.sm,
                width: "100%",
              }}
            >
              <Text component="h1" size="2rem" m={0} align="center">
                Login
              </Text>
              <Divider my="sm" />
              <TextInput
                label="Enter Mobile Number"
                placeholder="Enter Mobile Number"
                withAsterisk
                error={errors.mobile_no && errors.mobile_no.message}
                mt="md"
                {...register("mobile_no")}
              />
              <PasswordInput
                label="Enter Your Password"
                placeholder="Enter Your Password"
                withAsterisk
                mt="md"
                error={errors.password && errors.password.message}
                {...register("password")}
              />
              <Text
                color="blue"
                align="end"
                my="sm"
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Forgot Password?
              </Text>
              <Button loading={isLoading} type="submit" mt="md" fullWidth>
                Login
              </Button>
            </Box>
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default Login;
