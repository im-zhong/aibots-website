// 2024/7/6
// zhangzhong

import { Stack, Divider, Typography } from "@mui/material";
import theme from "@/app/ui/theme";

export function BigHeader({ header }: { header: string }) {
  return (
    <Stack direction="row" alignContent="center" justifyContent="center">
      <Divider
        flexItem
        sx={{ width: "30%", borderColor: theme.palette.common.black }}
      />
      <Typography variant="h3" fontWeight="bold">
        {header}
      </Typography>
      <Divider
        flexItem
        sx={{ width: "30%", borderColor: theme.palette.common.black }}
      />
    </Stack>
  );
}
