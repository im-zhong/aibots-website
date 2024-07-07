// 2024/6/21
// zhangzhong
"use client";

import * as React from "react";

import { knowledgeClient } from "@/app/lib/agent/knowledge-client";
import { Topic } from "@/app/lib/agent/types";
import { InputButton } from "@/app/ui/common/input-button";

// 这个输入框的组件在太多地方被使用了
// 还是写成一个可以服用的组件吧
export function AddTopicForm({
  setTopics,
}: {
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}) {
  const onSubmit = async (data: string) => {
    console.log(data);
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
      topic: data,
    });

    // if (error) {
    //   console.log(error);
    //   return;
    // }
    console.log(id);

    setTopics((prev) => [...prev, { topic: data, knowledgeId: id as string }]);
  };

  return (
    <InputButton
      name="topic"
      placeholder="new topic to add"
      label="Topic"
      button="ADD"
      onSubmit={onSubmit}
    />
  );
}
