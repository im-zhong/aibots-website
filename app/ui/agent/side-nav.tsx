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
import { Stack, Paper } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

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

function NavFooter() {
  return (
    <Stack direction="column" spacing={1}>
      <Paper
        sx={{
          px: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          ":hover": {
            backgroundColor: theme.palette.grey[200],
            cursor: "pointer",
          },
        }}
        onClick={() => {}}
      >
        <Stack direction="column">
          <Stack alignItems="center">
            <EmailIcon fontSize="small" />
          </Stack>
          <Stack alignItems="center">
            <Typography variant="body2">im.zhong@outlook.com</Typography>
          </Stack>
        </Stack>
      </Paper>

      <Paper
        sx={{
          px: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          ":hover": {
            backgroundColor: theme.palette.grey[200],
            cursor: "pointer",
          },
        }}
        onClick={() => {
          window.location.href = "https://github.com/im-zhong";
        }}
      >
        <Stack direction="column">
          <Stack alignItems="center">
            <GitHubIcon fontSize="small" />
          </Stack>

          <Stack alignItems="center">
            <Typography variant="body2">https://github.com/im-zhong</Typography>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
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
          flexDirection: "column",
        },
      }}
    >
      {
        // 原来如此，原来每个元素前面都有一个ToolBar占了一个位子
        // 实际上AppBar是不参与布局的 他就是固定的
        // flex: 1非常关键，他会充满整个空间
        // 把最后的box顶到最下面
        /*
        The flex: 1 CSS property in a Flexbox layout has a specific meaning. It is shorthand for three properties: flex-grow, flex-shrink, and flex-basis. When you use flex: 1, it is equivalent to flex-grow: 1; flex-shrink: 1; flex-basis: 0%. Here's what each of these properties means in this context:
        
        flex-grow: 1; This property defines the ability for a flex item to grow if necessary. It accepts a unitless value that serves as a proportion. It dictates what amount of the available space inside the flex container the item should take up. If all items have flex-grow set to 1, the remaining space in the container will be distributed equally to all children.
        flex-shrink: 1; This property defines the ability for a flex item to shrink if necessary. Like flex-grow, it accepts a unitless value that serves as a proportion. It dictates how much the flex item will shrink relative to the rest of the flex items in the container when there isn't enough space on the row.
        flex-basis: 0%; This property defines the default size of an element before the remaining space is distributed. It can be a length (e.g., 20%, 5rem, etc.) or a keyword. The 0% value means that the size of items is initially set to zero, and they will only grow or shrink from that point based on the flex-grow and flex-shrink values.

        So, when you apply flex: 1 to an element in a Flexbox layout, you're essentially telling it to take up as much space as it can, proportionally to its flex siblings, after accounting for any items that do not have flexibility (flex-grow: 0), and to shrink if necessary, starting from a base size of zero. This is a common pattern used to make elements fill up the remaining space in a container.
        */
      }
      <Box
        sx={{
          flex: 1,
          // border: "1px solid black"
        }}
      >
        {" "}
        {/* This Box wraps the List and allows it to grow */}
        <List>
          <NavItem icon={<HomeIcon />} text="Home" href="/agent" />
          <NavItem icon={<HomeIcon />} text="Home" href="/agent" />

          <Divider />

          <NavItem icon={<SmartToyIcon />} text="Create" href="/agent/create" />
          <Divider />

          <NavItem icon={<TocIcon />} text="Chats" href="/agent/my-chats" />
          <Divider />
        </List>
      </Box>

      {/* Logout Button at the end */}
      <Box sx={{ padding: 2 }}>
        <NavFooter />
      </Box>
    </Drawer>
  );
}
