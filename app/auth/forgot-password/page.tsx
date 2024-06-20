// 2024/5/21
// zhangzhong
"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import LoginForm from "@/app/ui/auth/login-form";
import ForgotPasswordForm from "@/app/ui/auth/forgot-password-form";

export default function Page() {
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
        Login
      </Typography>
      <ForgotPasswordForm />
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Does not have an account? <Link href="/auth/register">register</Link>{" "}
        one.
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Forget your password? <Link href="/auth/forgot-password">reset</Link>{" "}
        it.
      </Typography>
    </Box>
  );
}
