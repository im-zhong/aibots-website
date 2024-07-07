"use client";

import * as React from "react";
import { useRouter } from "next/router";
import GuestGuard from "@/app/ui/auth/guest-guard";
import { LogoHeader } from "@/app/ui/common/logo-header";
import { Stack } from "@mui/material";
import theme from "@/app/ui/theme";

// 所谓layout，不就是规定整个页面的布局吗
// 那么我们这里应该提供的就是一个整体的布局
// 一个header和一个rest of page box
// header用来装logo
// 剩下的装其他的form
// 然后虽然我们在global css里面定义了height为100%
// 但是因为相对height计算要求其直系父亲必须具有定义的高度
// 但是看起来我们嵌套了一大堆东西导致这个高度信息丢失了
// 所以我们这里需要给一个height: 100vh

// 仔细研究这个例子
// https://mui.com/material-ui/react-drawer/#clipped-under-the-app-bar

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <GuestGuard>
      <Stack
        height="100vh"
        sx={
          {
            // border: "1px solid black",
          }
        }
      >
        <LogoHeader color={theme.palette.common.black}></LogoHeader>
        <Stack
          alignItems="center"
          justifyContent="center"
          height="100%"
          sx={
            {
              // border: "1px solid blue",
            }
          }
        >
          {children}
        </Stack>
      </Stack>
    </GuestGuard>
  );
}
