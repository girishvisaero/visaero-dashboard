import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Divider,
    Text,
    TextInput,
    useMantineTheme
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { hash } from "../../lib/utils";
import { loginService } from "../../services";
import { LoginFormSchema } from "../../validations/schema";

const ForgotPassword = ({ handleIsForgotPass }) => {
  const queryClient = useQueryClient();

  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
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
    onError: () => {},
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
      <Text component="h1" size="1.5rem" m={0} align="center">
        Reset Password
      </Text>
      <Divider my="sm" />
      <Text size={"sm"}>
        Enter the email associated with your account and we'll send an email
        with instructions to reset your password
      </Text>
      <TextInput
        label="Enter Your Email"
        placeholder="Enter Your Email"
        withAsterisk
        error={errors.mobile_no && errors.mobile_no.message}
        mt="md"
        {...register("mobile_no")}
      />

      <Button loading={isLoading} type="submit" mt="md" fullWidth>
        Submit
      </Button>
      <Text color="brand" sx={{cursor:'pointer'}} onClick={handleIsForgotPass} align="center" fw={'bold'} fz={'sm'} py='sm'>Login</Text>
    </Box>
  );
};

export default ForgotPassword;
