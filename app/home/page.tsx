"use client";

import * as React from "react";
import {
  Container,
  Box,
  Typography,
  Divider,
  Stack,
  Paper,
} from "@mui/material";
import { LogoHeader } from "@/app/ui/common/logo-header";
import { Starter } from "@/app/ui/home/starter";
import { Prompt } from "@/app/ui/home/prompt";
import theme from "@/app/ui/theme";

export default function Page() {
  // 主页这里直接一个redirect
  // 但是我们在其他所有的页面都加上一个auth guard
  // 用于验证用户登录，如果用户登录了，就可以正常的访问那些页面
  // 如果没有，那么authguard会把我们回退到主页 或者登录页面
  // 这样就完成了自动登录

  return (
    <>
      <Stack
        direction="column"
        sx={{
          width: "100%", // Set the width
          height: "100vh", // Set the height
          backgroundColor: "rgba(0, 0, 0, 0.9)", // Set the background color
          // backgroundImage: "url('/background.png')", // Set the background image URL
          backgroundSize: "cover", // Cover the entire Box area
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat", // Do not repeat the image
        }}
      >
        {/* Your content here */}
        <LogoHeader color={theme.palette.common.white} />

        <Container
          sx={{
            height: "100%",
          }}
        >
          <Stack
            direction="column"
            height="100%"
            sx={
              {
                // border: "1px solid green",
              }
            }
          >
            <Typography
              sx={{
                color: theme.palette.common.white,
                textAlign: "center",
              }}
              fontWeight="bold"
              variant="h1"
            >
              Let’s missing the new world of Agent!
            </Typography>

            <Divider
              flexItem
              sx={{
                borderColor: theme.palette.common.white,
                borderWidth: 1,
                marginTop: 1,
              }}
              variant="middle"
            />

            <Stack
              sx={{
                flex: 1,
                // border: "1px solid blue",
              }}
            >
              <Stack
                direction="row"
                spacing={0}
                sx={
                  {
                    // border: "1px solid red",
                  }
                }
                height="100%"
              >
                <Stack alignItems="center" justifyContent="center" width="50%">
                  <Prompt />
                </Stack>
                <Stack alignItems="center" justifyContent="center" width="50%">
                  <Starter />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Stack>
    </>
  );
}
