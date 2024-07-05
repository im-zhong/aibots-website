// 2024/7/6
// zhangzhong

import { Stack, Divider, Typography } from "@mui/material";

export function BigHeader({ header }: { header: string }) {
  return (
    <Stack direction="row" alignContent="center" justifyContent="center">
      <Divider flexItem sx={{ width: "30%" }} />
      <Typography variant="h2">{header}</Typography>
      <Divider flexItem sx={{ width: "30%" }} />
    </Stack>
  );
}
