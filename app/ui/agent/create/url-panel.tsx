// 2024/7/5
// zhangzhong

import * as React from "react";
import { Stack } from "@mui/material";
import { KnowledgePoint } from "@/app/lib/agent/types";
import { URLUploader } from "./url-uploader";
import { KnowledgePointsShower } from "./knowledge-points-shower";

export function URLPanel({ knowledgeId }: { knowledgeId: string }) {
  const [urls, setURLs] = React.useState<KnowledgePoint[]>([]);

  return (
    <Stack direction="column" spacing={2}>
      <URLUploader knowledgeId={knowledgeId} setKnowledgePoints={setURLs} />
      <KnowledgePointsShower knowledgePoints={urls} />
    </Stack>
  );
}
