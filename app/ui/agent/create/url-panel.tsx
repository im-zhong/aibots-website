// 2024/7/5
// zhangzhong

import * as React from "react";
import { Stack, Divider, Box } from "@mui/material";
import { KnowledgePoint } from "@/app/lib/agent/types";
import { URLUploader } from "./url-uploader";
import { KnowledgePointsShower } from "./knowledge-points-shower";
import { UploadPanel } from "./upload-panel";

export function URLPanel({ knowledgeId }: { knowledgeId: string }) {
  const [urls, setURLs] = React.useState<KnowledgePoint[]>([]);

  return (
    <UploadPanel knowledgePoints={urls}>
      <URLUploader knowledgeId={knowledgeId} setKnowledgePoints={setURLs} />
    </UploadPanel>
  );
  // return (
  //   <Stack direction="column" spacing={2}>
  //     <Box
  //       height="80px"
  //       sx={{
  //         border: "1px solid black",
  //       }}
  //     >
  //       <URLUploader knowledgeId={knowledgeId} setKnowledgePoints={setURLs} />
  //     </Box>

  //     <Divider />
  //     <KnowledgePointsShower knowledgePoints={urls} />
  //   </Stack>
  // );
}
