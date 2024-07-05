// 2024/7/5
// zhangzhong

import * as React from "react";
import { Button, TextField, Box, Typography, Divider } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import Dropzone, { useDropzone } from "react-dropzone";
import { agentClient } from "@/app/lib/agent/agent-client";
import { authClient, User } from "@/app/lib/auth/auth_client";
import FormControlLabel from "@mui/material/FormControlLabel";

import Switch from "@mui/material/Switch";

import Paper from "@mui/material/Paper";
import { UserContext } from "@/app/ui/auth/user-provider";
import { Router } from "next/router";
import { path } from "@/app/lib/path";
import { Topic } from "@/app/lib/agent/types";
import { AvatarUploader } from "@/app/ui/common/avatar-uploader";

import { Stack, Avatar, Container } from "@mui/material";

interface CreateAgentFormData {
  name: string;
  description: string;
  prompt: string;
  is_shared: boolean;
  web_search: boolean;
  painting: boolean;
  multi_model: boolean;
  // knowledge 通过额外的state传入
  // knowledges: string[];
}

export function AgentInfoForm({
  topics,
  setTopics,
  user,
}: {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
  user: User;
}) {
  const router = useRouter();
  const { handleSubmit, control } = useForm<CreateAgentFormData>();

  const onSubmit = async (data: CreateAgentFormData) => {
    console.log(data);

    // const { agent, error } = await agentClient.createAgent({ ...data });
    const { agent, error } = await agentClient.createAgent({
      ...data,
      user_id: user.id,
    });
    if (error) {
      console.error("Error:", error);
      return;
    }
    if (!agent) {
      console.error("Error: agent is null");
      return;
    }

    console.log(agent);

    // TODO
    // 然后我们需要创建add knowledges
    // 但是knowledges要从那里来呢？
    // 现在有两个方案
    // 1. 把knowledges这个state放在这里 然后通过参数KnowledgeForm传递下去
    // 每当用户点击按钮时，我们就调用setKnowledges, 然后知识就会被添加到这个state里面
    // 这样的优点是不需要大幅改动目前的代码，缺点是会重新渲染他不应该渲染的组件 也就是当前组件
    // 2. 把创建智能体和增加知识库两个功能分开。在创建智能体的时候是不能添加知识的
    // 但是创建完成之后，我们可以随时的继续向其中不断的添加知识
    // 先用第一种把功能验证完毕
    // 第一种写完之后再写第二种其实也很简单，因为组件都是复用的
    // rename the variable, destructuring must have this feature!
    // if (topics.length === 0) {
    //   // console.error("Error: no knowledges");
    //   console.log("no knowledges");
    //   return;
    // }
    if (topics.length > 0) {
      const { error: addKnowledgesError } = await agentClient.addKnowledges({
        agent_id: agent.id,
        knowledge_ids: topics.map((topic) => topic.knowledgeId),
      });
      if (addKnowledgesError) {
        console.error("Error:", addKnowledgesError);
        return;
      }
    }

    // 如果创建成功了
    // 一定要把所有的state都清空
    // 然后跳转到主页
    setTopics([]);
    router.push(path.agent.home);
  };

  function AbilitySwitch({
    name,
    control,
    header,
    description,
  }: {
    name: string;
    control: any;
    header: string;
    description: string;
  }) {
    return (
      <>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="column">
            <Typography variant="h6">{header}</Typography>
            <Typography variant="body2">{description}</Typography>
          </Stack>

          <Controller
            name={name}
            control={control}
            defaultValue={true}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch defaultChecked />}
                label=""
                {...field}
              />
            )}
          />
        </Stack>
      </>
    );
  }

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Typography variant="h3">Agent Infomation</Typography>

      <Typography variant="body2">
        Add knowledges for your agent. It could be a file or a website url. When
        you ask questions about such topics, knowledge will be used.
      </Typography>

      <Divider
        orientation="horizontal"
        flexItem
        sx={{ borderColor: "primary.main" }}
      />

      <form
        style={{
          width: "100%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Stack
          sx={{
            width: "100%",
          }}
          direction="column"
          // alignItems="center"
          spacing={2}
        >
          {/* <AvatarUploader /> */}

          <Stack alignItems="center" justifyContent="center">
            <AvatarUploader />
          </Stack>

          <Divider />

          <Stack direction="column" spacing={1}>
            <Typography variant="h4">name*</Typography>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  sx={{ width: "100%" }}
                  label="name"
                  variant="outlined"
                  {...field}
                />
              )}
            />
          </Stack>

          <Divider />

          <Stack direction="column" spacing={1}>
            <Typography variant="h4">description*</Typography>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  multiline={true}
                  rows={3}
                  label="Description"
                  variant="outlined"
                  {...field}
                />
              )}
            />
          </Stack>

          <Divider />

          <Stack direction="column" spacing={1}>
            <Typography variant="h4">prompt*</Typography>
            <Controller
              name="prompt"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  label="Prompt"
                  variant="outlined"
                  multiline={true}
                  rows={3}
                  {...field}
                />
              )}
            />
          </Stack>

          <Divider />

          <Stack direction="column" spacing={1}>
            <Typography variant="h4">Ability</Typography>

            <AbilitySwitch
              header="Web Search Ability"
              description="a long long long long long long long long long longlong long long long longlong long long long longlong long long long longlong long long long longlong long long long long description to describe the ability"
              name="web_search"
              control={control}
            />

            <AbilitySwitch
              header="Painting Ability"
              description="a long long long long long long long long long longlong long long long longlong long long long longlong long long long longlong long long long longlong long long long long description to describe the ability"
              name="painting"
              control={control}
            />

            <AbilitySwitch
              header="Multi Model Ability"
              description="a long long long long long long long long long longlong long long long longlong long long long longlong long long long longlong long long long longlong long long long long description to describe the ability"
              name="multi_model"
              control={control}
            />
          </Stack>

          <Divider />

          <Button variant="contained" type="submit">
            Create
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
