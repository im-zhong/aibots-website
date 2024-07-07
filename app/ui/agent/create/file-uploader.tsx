// 2024/7/5
// zhangzhong

import * as React from "react";
import { Box, TextField, Button } from "@mui/material";

import Dropzone, { useDropzone } from "react-dropzone";

import { knowledgeClient } from "@/app/lib/agent/knowledge-client";
import { KnowledgePoint } from "@/app/lib/agent/types";

export function FileUploader({
  knowledgeId,
  setKnowledgePoints,
}: {
  knowledgeId: string;
  setKnowledgePoints: React.Dispatch<React.SetStateAction<KnowledgePoint[]>>;
}) {
  // 我懂了，我需要使用一个state来保存文件的list
  // 每当有文件上传完毕之后，我们就更新这个state
  // 然后就会重新渲染组件
  // 这是对的

  // 写在knowledge client里面
  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      console.log(acceptedFiles);
      acceptedFiles.forEach(async (file: File) => {
        // TODO
        // 对于每一个文件 我们都要调用一次api
        // 要不我们让api返回一个id吧 刚好作为我们item的id

        const { id, error } = await knowledgeClient.uploadFile({
          knowledge_id: knowledgeId,
          file: file,
        });

        if (error) {
          console.log(error);
          return;
        }

        setKnowledgePoints((prev) => [
          ...prev,
          { id: id, type: "file", path: file.name } as KnowledgePoint,
        ]);
      });
    },
    [knowledgeId, setKnowledgePoints]
  );

  // TODO: 还有一件事情啊
  // 不管是上传文件还是上传url
  // 后端处理都需要一些时间，在这段时间之内
  // 上传都应该是disable的 ，这个逻辑也需要加上
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        border: "1px dashed #ccc",
        height: "40",
      }}
    >
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>files</p>
        </div>
      </section>
    </Box>
  );
}
