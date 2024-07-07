// 2024/7/5
// zhangzhong

import * as React from "react";
import { Stack, Divider } from "@mui/material";
import { KnowledgePoint } from "@/app/lib/agent/types";
import { FileUploader } from "./file-uploader";
import { KnowledgePointsShower } from "./knowledge-points-shower";
import { UploadPanel } from "./upload-panel";

export function FilePanel({ knowledgeId }: { knowledgeId: string }) {
  const [files, setFiles] = React.useState<KnowledgePoint[]>([]);

  const testFiles = [
    {
      id: "1",
      type: "file",
      path: "test1 long long long long long path",
    },
    {
      id: "2",
      type: "file",
      path: "test2",
    },
  ] satisfies KnowledgePoint[];

  return (
    <UploadPanel knowledgePoints={testFiles}>
      <FileUploader knowledgeId={knowledgeId} setKnowledgePoints={setFiles} />
    </UploadPanel>
  );
  // return (
  //   <Stack direction="column" spacing={2}>
  //     <FileUploader knowledgeId={knowledgeId} setKnowledgePoints={setFiles} />
  //     <Divider />
  //     <KnowledgePointsShower knowledgePoints={files} />
  //   </Stack>
  // );
}
