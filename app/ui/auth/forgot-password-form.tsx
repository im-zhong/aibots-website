// 2024/5/21
// zhangzhong
"use client";

import * as React from "react";
import {
  Button,
  Typography,
  Stack,
  FormHelperText,
  FormControl,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  Alert,
  Box,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { authClient } from "@/app/lib/auth/auth_client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().min(1, { message: "email is required" }).email(),
});

type ForgotPasswordFormData = z.infer<typeof schema>;

// 输入忘记密码之后应该干什么？
// 应该等待后端发送邮件地址
// 点击链接会进入一个重置密码的界面，只需要填入新密码并重复一次就ok啦
// 所以我们还需要提供一个界面，reset-password-form!
export default function ForgotPasswordForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
  });
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
      // alert(error);
      setError("root", { message: error });
      return;
    }
    setIsSendEmail(true);
    // router.push("/agent");
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Forgot Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>email</InputLabel>
                <OutlinedInput {...field} label="email" type="email" />{" "}
                {errors.email && (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
          <Button variant="contained" type="submit">
            Forgot Password
          </Button>
        </Stack>
      </form>

      {isSendEmail && (
        <Alert severity="success">
          We have sent a verify email to your email address, please check it.
        </Alert>
      )}

      {errors.root && <Alert severity="warning">{errors.root.message}</Alert>}
    </Stack>
  );
}
