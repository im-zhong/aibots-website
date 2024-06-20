// 2024/5/21
// zhangzhong
"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { authClient } from "@/app/lib/auth/auth_client";
import { useRouter } from "next/navigation";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { handleSubmit, control } = useForm<LoginFormData>();
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    await authClient.login(data.username, data.password);
    console.log("login done!!!");
    router.push("/agent");
    console.log("redirect to agent page");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Controller
        name="username"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="Username" variant="outlined" {...field} />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            {...field}
          />
        )}
      />
      <Button variant="contained" type="submit">
        Login
      </Button>
    </Box>
  );
}
