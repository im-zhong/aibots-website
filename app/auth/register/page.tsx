// 2024/5/22
// zhangzhong

"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/app/ui/auth/register-from";

export default function Page() {
  return <RegisterForm />;
}
