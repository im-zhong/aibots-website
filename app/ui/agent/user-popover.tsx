// 2024/6/20
// zhangzhong
"use client";

import { useRouter } from "next/navigation";

import { UserContext } from "@/app/ui/auth/user-provider";
import { authClient } from "@/app/lib/auth/auth_client";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Link from "next/link";
import { path } from "@/app/lib/path";

import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function UserPopover() {
  const router = useRouter();
  const { user, resetUserContext } = React.useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = async () => {
    // await authClient.logout();
    console.log("logout");
    // 登出之后还需要刷新router才行
    const { error } = await authClient.logout();
    console.log("error", error);
    // 没必要 登出没必要判断是否失败 否则token失效了就没法登出了？？？
    if (error) {
      alert(error);
      return;
    }
    // 还需要重置usercontext
    // 否则登录会出现问题
    // 就重置成最初始状态
    // 或者在登录的时候重置一下状态呢？
    // 不行，所以我们必须要提供一个函数
    // 用来重置状态
    resetUserContext?.();
    router.refresh();
    router.replace(path.auth.login);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        {user?.name}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: "16px 20px " }}>
          <Typography variant="subtitle1">{user?.name}</Typography>
          <Typography color="text.secondary" variant="body2">
            {user?.email}
          </Typography>
        </Box>
        <Divider />
        <MenuList
          disablePadding
          sx={{ p: "8px", "& .MuiMenuItem-root": { borderRadius: 1 } }}
        >
          {/* <MenuItem
          component={RouterLink}
          // 把所有path写到一个变量里面也挺好的
          // 这样改也只需要改一个地方，perfect
          href={path.dashboard.settings}
          onClick={onClose}
        >
          <ListItemIcon>
            <GearSixIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem
          component={Link}
          href={paths.dashboard.account}
          onClick={onClose}
        >
          <ListItemIcon>
            <UserIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon>
          Profile
        </MenuItem> */}
          <MenuItem onClick={handleLogOut}>
            {/* <ListItemIcon>
            <SignOutIcon fontSize="var(--icon-fontSize-md)" />
          </ListItemIcon> */}
            Log out
          </MenuItem>
        </MenuList>
      </Popover>
    </div>
  );
}

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}
