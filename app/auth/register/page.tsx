// 2024/5/22
// zhangzhong

"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import RegisterForm from "@/app/ui/auth/register-from";

export default function Page() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // gap: 2,
        height: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Register
      </Typography>
      <RegisterForm />
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Already have an account? <Link href="/auth/login">login</Link> it.
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Forget your password? <Link href="/auth/forgot-password">reset</Link>{" "}
        it.
      </Typography>
    </Box>
  );
}
