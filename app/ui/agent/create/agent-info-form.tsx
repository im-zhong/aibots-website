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
import SmartToyIcon from "@mui/icons-material/SmartToy";
import DescriptionIcon from "@mui/icons-material/Description";
import Switch from "@mui/material/Switch";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import Paper from "@mui/material/Paper";
import { UserContext } from "@/app/ui/auth/user-provider";
import { Router } from "next/router";
import { path } from "@/app/lib/path";
import { Topic } from "@/app/lib/agent/types";
import { AvatarUploader } from "@/app/ui/common/avatar-uploader";
import LanguageIcon from "@mui/icons-material/Language";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import ShareIcon from "@mui/icons-material/Share";

import { Stack, Avatar, Container } from "@mui/material";
import theme from "@/app/ui/theme";

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

function AbilitySwitch({
  name,
  control,
  header,
  description,
  icon,
}: {
  name: string;
  control: any;
  header: string;
  description: string;
  icon: any;
}) {
  return (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="column">
          <Stack direction="row" alignItems="center" spacing={1}>
            {icon}
            <Typography variant="h6">{header}</Typography>
          </Stack>

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

function TextFieldWithLabel({
  label,
  control,
  name,
  rows,
  icon,
}: {
  label: string;
  control: any;
  name: string;
  rows: number;
  icon: any;
}) {
  return (
    <Stack direction="column" spacing={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {icon}
        <Typography variant="h5">
          {label}
          <span style={{ color: "red" }}>*</span>
        </Typography>
      </Stack>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            sx={{ width: "100%" }}
            multiline={rows > 1 ? true : false}
            rows={rows}
            label={label}
            variant="outlined"
            {...field}
          />
        )}
      />
    </Stack>
  );
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

  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Typography variant="h3">Agent Infomation</Typography>

      <Typography variant="body2" color={theme.palette.grey[500]}>
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

          <TextFieldWithLabel
            name="name"
            control={control}
            label="name"
            rows={1}
            icon={<SmartToyIcon fontSize="small" />}
          />

          <Divider />

          <TextFieldWithLabel
            name="description"
            control={control}
            label="description"
            rows={3}
            icon={<DescriptionIcon fontSize="small" />}
          />

          <Divider />

          <TextFieldWithLabel
            name="prompt"
            control={control}
            label="prompt"
            rows={3}
            icon={<TipsAndUpdatesIcon fontSize="small" />}
          />

          <Divider />

          <Stack direction="column" spacing={1}>
            <AbilitySwitch
              header="Web Search Ability"
              description="a long long long long long long long long long longlong long long long longlong long long long longlong long long long longlong long long long longlong long long long long description to describe the ability"
              name="web_search"
              control={control}
              icon={<LanguageIcon fontSize="small" />}
            />

            <AbilitySwitch
              header="Painting Ability"
              description="a long long long long long long long long long longlong long long long longlong long long long longlong long long long longlong long long long longlong long long long long description to describe the ability"
              name="painting"
              control={control}
              icon={<ColorLensIcon fontSize="small" />}
            />

            <AbilitySwitch
              header="Multi Model Ability"
              description="a long long long long long long long long long longlong long long long longlong long long long longlong long long long longlong long long long longlong long long long long description to describe the ability"
              name="multi_model"
              control={control}
              icon={<DoneAllIcon fontSize="small" />}
            />
          </Stack>

          <Divider />

          <AbilitySwitch
            header="Shared with others"
            description="a long long long long long long long long long longlong long long long longlong long long long longlong long long long longlong long long long longlong long long long long description to describe the ability"
            name="is_shared"
            control={control}
            icon={<ShareIcon fontSize="small" />}
          />

          <Divider />

          <Button variant="contained" type="submit">
            Create
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
