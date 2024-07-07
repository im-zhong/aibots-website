// 2024/6/29
// zhangzhong

"use client";

import { Typography, Box, Avatar, Divider } from "@mui/material";
import logoImage from "@/public/logo.png";
import Image from "next/image";
import { Logo } from "./logo";

export function LogoHeader({ color }: { color: string }) {
  return (
    <>
      <Box
        sx={{
          // border: "1px solid red",
          padding: 2,
        }}
      >
        <Logo color={color} />
      </Box>
    </>
  );
}
