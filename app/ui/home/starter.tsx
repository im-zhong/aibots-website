// 2024/6/29
// zhangzhong

"use client";

import { Typography, Box, Stack, Button, Container } from "@mui/material";
import theme from "@/app/ui/theme";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import { useRouter } from "next/navigation";
import { path } from "@/app/lib/path";

export function Starter() {
  const router = useRouter();
  const buttonWidth = 100;
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={4}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        <CelebrationOutlinedIcon
          fontSize="large"
          sx={{
            color: theme.palette.common.white,
          }}
        />
        <Typography
          variant="h2"
          fontWeight="bold"
          sx={{
            color: theme.palette.common.white,
          }}
        >
          Start from here!
        </Typography>
      </Stack>

      <Stack direction="column" spacing={1}>
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          sx={
            {
              // border: "1px solid white",
            }
          }
        >
          <Button
            variant="contained"
            sx={{
              width: buttonWidth,
              backgroundColor: "primary",
            }}
            onClick={() => {
              router.push(path.auth.register);
            }}
          >
            register
          </Button>
          <Typography
            sx={{
              color: theme.palette.common.white,
            }}
          >
            one, if you do not have an account yet
          </Typography>
        </Stack>

        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            color: theme.palette.common.white,
          }}
        >
          or
        </Typography>

        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={
            {
              // border: "1px solid white",
            }
          }
        >
          <Button
            variant="contained"
            sx={{
              width: buttonWidth,
              backgroundColor: "secondary",
            }}
            onClick={() => {
              router.push(path.auth.login);
            }}
          >
            login
          </Button>
          <Typography
            sx={{
              color: theme.palette.common.white,
            }}
          >
            if you already have one
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
