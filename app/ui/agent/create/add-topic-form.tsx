// 2024/6/21
// zhangzhong
"use client";

import * as React from "react";
import { Button, TextField, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";

import { knowledgeClient } from "@/app/lib/agent/knowledge-client";
import { Topic } from "@/app/lib/agent/types";

export function AddTopicForm({
  setTopics,
}: {
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}) {
  const { handleSubmit, control } = useForm<{ topic: string }>();

  const onSubmit = async ({ topic }: { topic: string }) => {
    console.log(topic);
    // const { agent, error } = await agentClient.createAgent({ ...data });
    // call api to add new topic\
    // TODO!
    // 不对，后端接口设计的不对
    // 知识不应该和agent绑定在一起

    // 我们可以在后续向某个agent添加知识啊
    // 为什么创建知识的时候就要绑定一个agent呢？
    // 现在调用这个API会出错 所以暂时先不调用
    // 随机生成一个id
    const { id, error } = await knowledgeClient.createTopic({
      topic: topic,
    });

    // if (error) {
    //   console.log(error);
    //   return;
    // }
    console.log(id);

    setTopics((prev) => [...prev, { topic: topic, knowledgeId: id as string }]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-around"
        spacing={2}
      >
        <Controller
          name="topic"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Topic" variant="outlined" {...field} />
          )}
        ></Controller>
        <Button variant="contained" type="submit">
          Add New Topic
        </Button>
      </Stack>
    </form>
  );
}
