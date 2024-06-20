import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import ProTip from "@/app/ui/pro-tip";
import Copyright from "@/app/ui/copy-right";

export default function Home() {
  // 主页这里直接一个redirect
  // 但是我们在其他所有的页面都加上一个auth guard
  // 用于验证用户登录，如果用户登录了，就可以正常的访问那些页面
  // 如果没有，那么authguard会把我们回退到主页 或者登录页面
  // 这样就完成了自动登录

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Do not have an account?
        </Typography>
        <Link href="/auth/register" color="secondary" component={NextLink}>
          Register one!
        </Link>
      </Box>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Already have an account?
        </Typography>
        <Link href="/auth/login" color="secondary" component={NextLink}>
          Login to enjoy agent services!
        </Link>
      </Box>
    </Container>
  );
}
