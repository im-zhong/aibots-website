// 2024/5/22
// zhangzhong

"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, set, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth/auth_client";

interface RegisterFormData {
  email: string;
  password: string;
  name: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const { handleSubmit, control } = useForm<RegisterFormData>();

  // 如果发送了确认邮件，我们应该告诉用户去邮箱查看邮件
  // 这显然需要一个state
  const [isSendEmail, setIsSendEmail] = React.useState<boolean>(false);

  const onSubmit = async (data: RegisterFormData) => {
    console.log(data);
    try {
      //   const response = await fetch("http://localhost:8000/api/auth/register", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });
      //   const json = await response.json();
      const { error } = await authClient.register({ ...data });
      // console.log(json);
      // 注册成功之后应该重定向的登录页面
      // redirect("/auth/login");
      // 如果用户注册了之后没有点击确认
      // token失效之后，再次点击注册
      // 数据库里面已经存在此账户
      // 但是无法发送确认邮件
      // 会导致一直无法注册此账号
      // 最简单的方法就是不论如何，只要点击注册就会发送一封确认邮件

      // if (!error) {
      // 不对哦，我应该马上发一个确认的API
      // 然后引导用户查看邮箱
      authClient.requestVerifyToken({ email: data.email });
      setIsSendEmail(true);
      // router.push("/auth/login");
      // }
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

      {isSendEmail && (
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          We have sent a verify email to your email address, please check it.
        </Typography>
      )}
    </Box>
  );
}
