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
import { Toolbar } from "@mui/material";

const drawerWidth = 240;

export default function LeftNav() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // https://mui.com/material-ui/react-drawer/
  const DrawerList = (
    <Box sx={{}} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText>
              <Link href="/agent">Home</Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText>
              <Link href="/agent/create">Create Bot</Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>{<InboxIcon />}</ListItemIcon>
            <ListItemText>
              <Link href="/agent/my-chats">My Chats</Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

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
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText>
                <Link href="/agent">Home</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText>
                <Link href="/agent/create">Create Bot</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton>
              <ListItemIcon>{<InboxIcon />}</ListItemIcon>
              <ListItemText>
                <Link href="/agent/my-chats">My Chats</Link>
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
