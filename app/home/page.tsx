"use client";

import * as React from "react";
import { Container, Box, Typography, Divider, Stack } from "@mui/material";
import { LogoHeader } from "@/app/ui/logo-header";
import { Starter } from "@/app/ui/home/starter";
import { Prompt } from "@/app/ui/home/prompt";

export default function Page() {
  // 主页这里直接一个redirect
  // 但是我们在其他所有的页面都加上一个auth guard
  // 用于验证用户登录，如果用户登录了，就可以正常的访问那些页面
  // 如果没有，那么authguard会把我们回退到主页 或者登录页面
  // 这样就完成了自动登录

  return (
    <>
      <Box
        sx={{
          width: "100%", // Set the width
          height: "100vh", // Set the height
          backgroundImage: "url('/background.png')", // Set the background image URL
          backgroundSize: "cover", // Cover the entire Box area
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat", // Do not repeat the image
        }}
      >
        {/* Your content here */}
        <LogoHeader />
        <Container>
          <Typography
            sx={{
              color: "white",
            }}
            variant="h1"
          >
            Let’s missing the new world of Agent!
          </Typography>
          <Divider />
          <Container>
            <Stack direction="row" spacing={2}>
              <Container>
                <Starter />
              </Container>
              <Container>
                <Prompt />
              </Container>
            </Stack>
          </Container>
        </Container>
      </Box>
    </>
  );
}
