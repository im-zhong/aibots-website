// 2024/6/29
// zhangzhong

"use client";

import { Typography, Box, Avatar, Divider } from "@mui/material";
import logoImage from "@/public/logo.png";
import Image from "next/image";

export function Logo() {
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, padding: 3 }}>
        {/* Adjusted for flex display */}
        <Image src={logoImage} alt="" width={61} height={61} />
        <Divider
          sx={{ borderColor: "black" }}
          orientation="vertical"
          flexItem
        />{" "}
        {/* Vertical Divider */}
        <Typography
          sx={{
            color: "black",
          }}
          variant="h4"
        >
          Agenicy
        </Typography>
      </Box>
    </>
  );
}

export function LogoHeader() {
  return (
    <>
      <Box
        sx={{
          border: "1px solid red",
        }}
      >
        <Logo />
      </Box>
    </>
  );
}
