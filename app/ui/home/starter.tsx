// 2024/6/29
// zhangzhong

import { Typography, Box, Stack, Button } from "@mui/material";
export function Starter() {
  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        spacing={1}
        height={"60vh"}
      >
        <Typography
          variant="h2"
          sx={{
            color: "white",
          }}
        >
          Start from here!
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" color="success">
            register
          </Button>
          <Typography
            sx={{
              color: "white",
            }}
          >
            if you do not have an account
          </Typography>
        </Stack>
        <Typography
          variant="h3"
          sx={{
            color: "white",
          }}
        >
          or
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">login</Button>
          <Typography
            sx={{
              color: "white",
            }}
          >
            if you already have one
          </Typography>
        </Stack>
      </Stack>
    </>
  );
}
