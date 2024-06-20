// 2024/5/21
// zhangzhong
"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { authClient } from "@/app/lib/auth/auth_client";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/ui/auth/user-provider";

interface LoginFormData {
  username: string;
  password: string;
}

export default function LoginForm() {
  const { handleSubmit, control } = useForm<LoginFormData>();
  const router = useRouter();
  const { updateUserContext } = React.useContext(UserContext);

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    // TODO: 这里登录出错了应该和react-form进行一个联动，输出错误才对
    // 还有就是login返回token是没有用的
    const { error } = await authClient.login(data.username, data.password);
    if (error) {
      alert(error);
    }
    updateUserContext?.();
    // 这里是不是应该设疑下user context ？
    // 还是说在authguard那里获取一下用户信息？
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
