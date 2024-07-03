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
  return <ForgotPasswordForm />;
}
