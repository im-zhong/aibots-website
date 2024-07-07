// 2024/7/6
// zhangzhong

"use client";

import { Typography, Box, Avatar, Divider, Stack } from "@mui/material";
import logoImage from "@/public/logo.png";
import Image from "next/image";

import theme from "@/app/ui/theme";

export function Logo({
  color = theme.palette.common.black,
}: {
  color: string;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      width={200}
      sx={
        {
          // border: "1px solid red",
        }
      }
    >
      <Image src={logoImage} alt="" width={50} height={50} />

      <Typography color={color} variant="h4" fontWeight="bold">
        AGENT
      </Typography>
    </Stack>
  );
}
