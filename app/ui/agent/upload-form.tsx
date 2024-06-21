// 2024/6/21
// zhangzhong

"use client";

// 上传文件的话就从做成一个单独的API
// 然后这个API返回文件的id
// 然后我们在创建智能体的API里面传入这个文件的id即可
// 这样比较灵活

import * as React from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import Dropzone, { useDropzone } from "react-dropzone";
import { CreateAgentForm } from "@/app/ui/agent/create-agent-form";
import { api } from "@/app/lib/api";

import { knowledgeClient } from "@/app/lib/agent/knowledge-client";

export interface KnowledgePoint {
  id: string;
  file_or_url: string;
}

// https://react-dropzone.js.org/
// https://austingil.com/uploading-files-with-html/
export function UploadFileForm({
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
          { id: id, file_or_url: file.name } as KnowledgePoint,
        ]);
      });
    },
    [knowledgeId, setKnowledgePoints]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        border: "1px dashed #ccc",
      }}
    >
      <section className="container">
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag and drop some files here, or click to select files</p>
        </div>
      </section>
    </Box>
  );
}

export function UploadUrlForm({
  knowledgeId,
  setKnowledgePoints,
}: {
  knowledgeId: string;
  setKnowledgePoints: React.Dispatch<React.SetStateAction<KnowledgePoint[]>>;
}) {
  const { handleSubmit, control } = useForm<{ url: string }>();
  const onSubmit = async ({ url }: { url: string }) => {
    console.log(url);
    // const { agent, error } = await agentClient.createAgent({ ...data });
    const { id, error } = await knowledgeClient.uploadUrl({
      knowledge_id: knowledgeId,
      url: url,
    });
    if (error) {
      console.log(error);
      return;
    }
    setKnowledgePoints((prev) => [
      ...prev,
      { id: id, file_or_url: url } as KnowledgePoint,
    ]);
  };
  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Controller
        name="url"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField label="url" variant="outlined" {...field} />
        )}
      ></Controller>

      <Button variant="contained" type="submit">
        Upload Url
      </Button>
    </Box>
  );
}
