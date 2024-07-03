// 2024/5/22
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
import { Controller, set, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth/auth_client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(1, { message: "name is required." }),
  email: z.string().min(1, { message: "email is required." }).email(),
  password: z
    .string()
    .min(8, { message: "password at least has 8 characters." }),
});

type RegisterFormData = z.infer<typeof schema>;

function RegisterHeader() {
  // TODO
  // register用粗体会好看一些
  // 输入框再细长一些好看
  // 而且输入框的大小不要发生变化啊！！！
  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Register
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Already have an account? <Link href="/auth/login">login</Link> it.
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Forget your password? <Link href="/auth/forgot-password">reset</Link>{" "}
        it.
      </Typography>
    </Box>
  );
}

function RegisterFooter({ error }: { error?: string }) {
  return <>{error && <Alert severity="warning">error</Alert>}</>;
}

export function RegisterForm() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({ resolver: zodResolver(schema) });

  // 如果发送了确认邮件，我们应该告诉用户去邮箱查看邮件
  // 这显然需要一个state
  const [isSendEmail, setIsSendEmail] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

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
      if (error) {
        setError("root", { message: error });
        return;
      }
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
    <Stack spacing={2}>
      <RegisterHeader />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <FormControl error={Boolean(errors.name)}>
                <InputLabel>name</InputLabel>
                <OutlinedInput {...field} label="name" />{" "}
                {errors.name && (
                  <FormHelperText>{errors.name.message}</FormHelperText>
                )}
              </FormControl>
            )}
          ></Controller>

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
          ></Controller>

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
          ></Controller>

          <Button variant="contained" type="submit">
            Register
          </Button>
        </Stack>
      </form>

      {isSendEmail && (
        <Alert severity="success">
          We have sent a verify email to your email address, please check it.
        </Alert>
      )}
      <RegisterFooter error={errors.root?.message} />
    </Stack>
  );
}
