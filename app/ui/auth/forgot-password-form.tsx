// 2024/5/21
// zhangzhong
"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { authClient } from "@/app/lib/auth/auth_client";
import { useRouter } from "next/navigation";

interface ForgotPasswordFormData {
  email: string;
}

export default function LoginForm() {
  const { handleSubmit, control } = useForm<ForgotPasswordFormData>();
  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log(data);
    await authClient.forgotPassword({ email: data.email });
    router.push("/bot");
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
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="Email" variant="outlined" {...field} />
        )}
      />
      <Button variant="contained" type="submit">
        Forgot Password
      </Button>
    </Box>
  );
}
