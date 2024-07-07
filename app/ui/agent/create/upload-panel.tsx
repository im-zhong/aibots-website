// 2024/7/5
// zhangzhong

import * as React from "react";
import { Stack, Divider, Box } from "@mui/material";
import { KnowledgePoint } from "@/app/lib/agent/types";
import { URLUploader } from "./url-uploader";
import { KnowledgePointsShower } from "./knowledge-points-shower";

export function UploadPanel({
  children,
  knowledgePoints,
}: {
  children: React.ReactNode;
  knowledgePoints: KnowledgePoint[];
}) {
  return (
    <Stack direction="column" spacing={0}>
      <Box
        height="70px"
        sx={
          {
            // border: "1px solid black",
          }
        }
        // direction="row"
        // alignItems="center"
      >
        {children}
      </Box>
      <Divider />
      <KnowledgePointsShower knowledgePoints={knowledgePoints} />
    </Stack>
  );
}
