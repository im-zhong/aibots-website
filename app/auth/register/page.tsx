// 2024/5/22
// zhangzhong

"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}

async function requestVerifyToken({ email }: { email: string }) {
  const response = await fetch(
    "http://localhost:8000/api/auth/request-verify-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );
  const json = await response.json();
  console.log(json);
}

function RegisterForm() {
  const router = useRouter();
  const { handleSubmit, control } = useForm<RegisterFormData>();

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      console.log(json);
      // 注册成功之后应该重定向的登录页面
      // redirect("/auth/login");
      if (response.ok) {
        // 不对哦，我应该马上发一个确认的API
        // 然后引导用户查看邮箱
        requestVerifyToken({ email: data.email });
        router.push("/auth/login");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="Name" variant="outlined" {...field} />
        )}
      ></Controller>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="Email" type="email" variant="outlined" {...field} />
        )}
      ></Controller>

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
      ></Controller>

      <Button variant="contained" type="submit">
        Register
      </Button>
    </Box>
  );
}

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
        Forget your password? <Link href="/auth/reset-password">reset</Link> it.
      </Typography>
    </Box>
  );
}
