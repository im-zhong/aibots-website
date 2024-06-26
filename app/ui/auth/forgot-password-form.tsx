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

// 输入忘记密码之后应该干什么？
// 应该等待后端发送邮件地址
// 点击链接会进入一个重置密码的界面，只需要填入新密码并重复一次就ok啦
// 所以我们还需要提供一个界面，reset-password-form!
export default function ForgotPasswordForm() {
  const { handleSubmit, control } = useForm<ForgotPasswordFormData>();
  const router = useRouter();
  // 这里和登录一样
  // TODO
  // 应该弹出一个提示 提醒用户查看邮箱

  // 如果发送了确认邮件，我们应该告诉用户去邮箱查看邮件
  // 这显然需要一个state
  const [isSendEmail, setIsSendEmail] = React.useState<boolean>(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    console.log(data);
    const { error } = await authClient.forgotPassword({ email: data.email });
    if (error) {
      alert(error);
    }
    setIsSendEmail(true);
    // router.push("/agent");
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
      {isSendEmail && (
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          We have sent a verify email to your email address, please check it.
        </Typography>
      )}
    </Box>
  );
}
