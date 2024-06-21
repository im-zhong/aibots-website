// 2024/5/22
// zhangzhong

"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import LoginForm from "@/app/ui/auth/login-form";
import ResetPasswordForm from "@/app/ui/auth/reset-password-form";

export default function Page({ params }: { params: { token: string } }) {
  // const router = useRouter();

  // 可以这个页面就只用来验证token
  // 然后验证通过之后会跳转到重置密码的页面
  // React.useEffect(() => {
  //   authClient.verify({ token: params.token }).then(({ error }) => {
  //     if (error) {
  //       console.error("Error:", error);
  //       return;
  //     }
  //     router.replace("/auth/login");
  //   });
  // }, [router, params.token]);

  // 不对不对
  // token是跟着reset的api一起发送过去的
  // 所以这里应该先提供一个form页面
  // 然后点击submit按钮才发送reset passwrod api

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // gap: 2,
        // The vh unit in CSS stands for "viewport height".
        // It is a relative unit that represents 1% of the height of the viewport. The viewport is the visible area of the webpage on the user's screen.
        height: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Reset Password
      </Typography>
      <ResetPasswordForm token={params.token} />
    </Box>
  );
}
