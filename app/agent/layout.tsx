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
import SideNav from "@/app/ui/agent/side-nav";
import Header from "@/app/ui/agent/header";

export default function Layout({ children }: { children: React.ReactNode }) {
  // 需要在这里添加一个个人信息的按钮
  // 这样我就可以登出了
  return (
    <AuthGuard>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
        }}
      >
        <SideNav />
        <Box>
          <Header />
          {children}
        </Box>
      </Box>
    </AuthGuard>
  );
}
