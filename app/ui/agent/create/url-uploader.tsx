// 2024/7/5
// zhangzhong

import { Box, TextField, Button, ButtonGroup } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { knowledgeClient } from "@/app/lib/agent/knowledge-client";
import { KnowledgePoint } from "@/app/lib/agent/types";
import { InputButton } from "@/app/ui/common/input-button";

export function URLUploader({
  knowledgeId,
  setKnowledgePoints,
}: {
  knowledgeId: string;
  setKnowledgePoints: React.Dispatch<React.SetStateAction<KnowledgePoint[]>>;
}) {
  const onSubmit = async (data: string) => {
    const url = data;
    console.log(url);
    // const { agent, error } = await agentClient.createAgent({ ...data });
    const { id, error } = await knowledgeClient.uploadURL({
      knowledge_id: knowledgeId,
      url: url,
    });
    if (error) {
      console.log(error);
      return;
    }
    setKnowledgePoints((prev) => [
      ...prev,
      { id: id, type: "url", path: url } as KnowledgePoint,
    ]);
  };

  return (
    <InputButton
      placeholder="url"
      label="url"
      button="upload"
      onSubmit={onSubmit}
    ></InputButton>
  );
}
