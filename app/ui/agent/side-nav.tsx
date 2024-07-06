// 2024/6/20
// zhangzhong

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
import { Toolbar, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import theme from "@/app/ui/theme";
import { useRouter } from "next/navigation";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import TocIcon from "@mui/icons-material/Toc";
import { usePathname } from "next/navigation";

const drawerWidth = 200;

function NavItem({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode;
  text: string;
  href: string;
}) {
  const pathname = usePathname();

  const active = pathname === href;

  return (
    <ListItem
      sx={{
        // border: "1px solid red",
        backgroundColor: active ? theme.palette.grey[300] : "white",
      }}
      disablePadding
    >
      <ListItemButton sx={{}}>
        <ListItemIcon sx={{}}>{icon}</ListItemIcon>
        <ListItemText>
          <Link href={href} style={{ textDecoration: "none" }}>
            <Typography
              color={theme.palette.grey[700]}
              variant="h6"
              fontWeight="bold"
            >
              {text}
            </Typography>
          </Link>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

export function LeftNav() {
  const pathname = usePathname();
  console.log("pathname", pathname);

  // const currentRoutePath = router.pathname;

  // console.log("currentRoutePath", currentRoutePath);

  // https://mui.com/material-ui/react-drawer/

  // 需要在这里添加一个个人信息的按钮
  // 这样我就可以登出了
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {
        // 原来如此，原来每个元素前面都有一个ToolBar占了一个位子
        // 实际上AppBar是不参与布局的 他就是固定的
      }

      <List>
        <NavItem icon={<HomeIcon />} text="Home" href="/agent" />
        <NavItem icon={<HomeIcon />} text="Home" href="/agent" />

        <Divider />

        <NavItem icon={<SmartToyIcon />} text="Create" href="/agent/create" />
        <Divider />

        <NavItem icon={<TocIcon />} text="Chats" href="/agent/my-chats" />
        <Divider />
      </List>
    </Drawer>
  );
}
