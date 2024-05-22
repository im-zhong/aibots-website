// 2024/5/21
// zhangzhong
"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";

interface LoginFormData {
  username: string;
  password: string;
}

function LoginForm() {
  const { handleSubmit, control } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    try {
      // Handle login logic here
      // use fecthAPI to cal api
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        // mode: "cors",
        // cache: "no-cache",
        // credentials: "same-origin",
        headers: {
          // The Content-Type header is set to application/x-www-form-urlencoded to indicate that the body contains URL-encoded form data.
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // data is an object containing the username and password.
        // This object is converted to a URL-encoded string using URLSearchParams and included in the body of the POST request
        body: new URLSearchParams({
          username: data.username,
          password: data.password,
          // grant_type: "password",
          // scope: "read write", // adjust this according to your API's scope
        }),
        credentials: "include",
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error("Error:", error);
    }
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

export default function Page() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        // gap: 2,
        // The vh unit in CSS stands for "viewport height".
        // It is a relative unit that represents 1% of the height of the viewport. The viewport is the visible area of the webpage on the user's screen.
        height: "100vh",
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Login
      </Typography>
      <LoginForm />
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Does not have an account? <Link href="/auth/register">register</Link>{" "}
        one.
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        Forget your password? <Link href="/auth/reset-password">reset</Link> it.
      </Typography>
    </Box>
  );
}
