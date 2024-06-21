// 2024/5/21
// zhangzhong
"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { authClient } from "@/app/lib/auth/auth_client";
import { useRouter } from "next/navigation";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

// 输入忘记密码之后应该干什么？
// 应该等待后端发送邮件地址
// 点击链接会进入一个重置密码的界面，只需要填入新密码并重复一次就ok啦
// 所以我们还需要提供一个界面，reset-password-form!
export default function ForgotPasswordForm({ token }: { token: string }) {
  const { handleSubmit, control } = useForm<ResetPasswordFormData>();
  const router = useRouter();

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log(data);

    // TODO: 所有的错误都应该和react form进行一个互动
    if (data.password !== data.confirmPassword) {
      alert("password not match");
      return;
    }

    const { error } = await authClient.resetPassword({
      token: token,
      password: data.password,
    });
    if (error) {
      alert(error);
      return;
    }

    router.replace("/auth/login");
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
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="Password" variant="outlined" {...field} />
        )}
      />
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="ConfirmPassword" variant="outlined" {...field} />
        )}
      />
      <Button variant="contained" type="submit">
        Reset Password
      </Button>
    </Box>
  );
}
