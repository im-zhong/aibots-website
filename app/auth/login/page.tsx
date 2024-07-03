// 2024/5/21
// zhangzhong
"use client";

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import LoginForm from "@/app/ui/auth/login-form";

export default function Page() {
  // 现在有一个问题
  // 整个登录页是否看作一整个组件？我认为应该看作一整个组件
  // 那这样的话最好写在一个文件里面
  // 如果层次过多了 可以写成几个函数，
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     // flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     // gap: 2,
    //     // The vh unit in CSS stands for "viewport height".
    //     // It is a relative unit that represents 1% of the height of the viewport. The viewport is the visible area of the webpage on the user's screen.
    //     height: "100%",
    //     border: "1px solid black",
    //   }}
    // >

    // </Box>

    <LoginForm />
  );
}
