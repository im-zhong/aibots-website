// 2024/7/5
// zhangzhong

import { Box, TextField, Button, ButtonGroup } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { knowledgeClient } from "@/app/lib/agent/knowledge-client";
import { KnowledgePoint } from "@/app/lib/agent/types";

export function URLUploader({
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Controller
          name="url"
          control={control}
          render={({ field }) => <TextField label="url" {...field} />}
        />

        <Button variant="contained" type="submit">
          upload
        </Button>
      </ButtonGroup>
    </form>
  );
}

export function URLUploaderV2() {
  const { handleSubmit, control } = useForm<{ url: string }>();

  const onSubmit = ({ url }: { url: string }) => alert("hello");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <TextField label="url" variant="outlined" {...field} />
          )}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </ButtonGroup>
    </form>
  );
}
