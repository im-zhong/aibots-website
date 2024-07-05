// 2024/7/5
// zhangzhong

import * as React from "react";
import { Stack } from "@mui/material";
import { KnowledgePoint } from "@/app/lib/agent/types";
import { FileUploader } from "./file-uploader";
import { KnowledgePointsShower } from "./knowledge-points-shower";

export function FilePanel({ knowledgeId }: { knowledgeId: string }) {
  const [files, setFiles] = React.useState<KnowledgePoint[]>([]);

  return (
    <Stack direction="column" spacing={2}>
      <FileUploader knowledgeId={knowledgeId} setKnowledgePoints={setFiles} />
      <KnowledgePointsShower knowledgePoints={files} />
    </Stack>
  );
}
