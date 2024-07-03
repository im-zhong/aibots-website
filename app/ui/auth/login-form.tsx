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
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { authClient } from "@/app/lib/auth/auth_client";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/ui/auth/user-provider";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// https://github.com/react-hook-form/resolvers
// https://github.com/react-hook-form/resolvers?tab=readme-ov-file#zod
const schema = z.object({
  email: z.string().min(1, { message: "email is required" }).email(),
  password: z.string().min(1, { message: "password is required" }),
});

type LoginFormData = z.infer<typeof schema>;

function LoginHeader() {
  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Login
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Does not have an account? <Link href="/auth/register">register</Link>{" "}
        one.
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Forget your password? <Link href="/auth/forgot-password">reset</Link>{" "}
        it.
      </Typography>
    </>
  );
}

function LoginFooter({ error }: { error: boolean }) {
  return (
    <>{error && <Alert severity="warning">Invalid email or password.</Alert>}</>
  );
}

export default function LoginForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });
  const router = useRouter();
  const { isLoading, updateUserContext } = React.useContext(UserContext);
  const [loginError, setLoginError] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    // TODO: 这里登录出错了应该和react-form进行一个联动，输出错误才对
    // 还有就是login返回token是没有用的
    const { error } = await authClient.login(data.email, data.password);
    if (error) {
      // alert(error);
      setLoginError(true);
      return;
    }
    await updateUserContext?.();
    // 这里是不是应该设疑下user context ？
    // 还是说在authguard那里获取一下用户信息？
    console.log("login done!!!");
    router.push("/agent");
    console.log("redirect to agent page");
  };

  // 一般不在form上直接做样式？
  // 而是from的下一级来一个stack，来做样式？
  // 是不是因为stack没有办法指定component？
  // 虽然是可以的，但是仔细想想确实不好
  // form更关注内容，因为他要提交数据吗
  // 但是stack flex box这些更专注layout，他们耦合在一起确实不好

  return (
    <Stack spacing={2}>
      <LoginHeader />
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

          <Button disabled={isLoading} variant="contained" type="submit">
            login
          </Button>
        </Stack>
      </form>
      <LoginFooter error={loginError} />
    </Stack>
  );
}
