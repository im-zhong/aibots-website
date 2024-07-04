"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Link from "next/link";
import AuthGuard from "@/app/ui/auth/auth-guard";
import LeftNav from "@/app/ui/agent/side-nav";
import TopNav from "@/app/ui/agent/header";
import {
  Stack,
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

export default function Layout({ children }: { children: React.ReactNode }) {
  // 需要在这里添加一个个人信息的按钮
  // 这样我就可以登出了
  return (
    <AuthGuard>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <LeftNav />

        <TopNav />

        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          {
            // 这里也有一个ToolBar占着位子 原来如此 还挺聪明卧槽
          }
          <Toolbar />
          {children}
        </Box>
      </Box>
    </AuthGuard>
  );
}
