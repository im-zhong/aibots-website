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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { authClient } from "@/app/lib/auth/auth_client";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// TODO: 感觉auth的这几个页面的重复度比较高，到最后可以重构一下
const schema = z.object({
  password: z.string().min(1, { message: "password is required" }),
});

type ResetPasswordFormData = z.infer<typeof schema>;

// 输入忘记密码之后应该干什么？
// 应该等待后端发送邮件地址
// 点击链接会进入一个重置密码的界面，只需要填入新密码并重复一次就ok啦
// 所以我们还需要提供一个界面，reset-password-form!
export default function ForgotPasswordForm({ token }: { token: string }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const onSubmit = async (data: ResetPasswordFormData) => {
    console.log(data);

    // TODO: 所有的错误都应该和react form进行一个互动
    // if (data.password !== data.confirmPassword) {
    //   alert("password not match");
    //   return;
    // }

    const { error } = await authClient.resetPassword({
      token: token,
      password: data.password,
    });
    if (error) {
      setError("root", { message: error });
      return;
    }

    router.replace("/auth/login");
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Reset Password
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>password</InputLabel>
                <OutlinedInput
                  {...field}
                  label="password"
                  type={passwordVisible ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      {passwordVisible ? (
                        <Visibility
                          cursor="pointer"
                          onClick={() => setPasswordVisible(false)}
                        />
                      ) : (
                        <VisibilityOff
                          cursor="pointer"
                          onClick={() => setPasswordVisible(true)}
                        />
                      )}
                    </InputAdornment>
                  }
                />
                {errors.password && (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Button variant="contained" type="submit">
            Reset Password
          </Button>
        </Stack>
      </form>

      {errors.root && <Alert severity="warning">{errors.root.message}</Alert>}
    </Stack>
  );
}
