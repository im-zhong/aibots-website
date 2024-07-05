"use client";

// 上传文件的话就从做成一个单独的API
// 然后这个API返回文件的id
// 然后我们在创建智能体的API里面传入这个文件的id即可
// 这样比较灵活
// TODO
// https://mui.com/material-ui/react-accordion/
// 每个新增的topic都可以使用一个accordion
// 先弄布局，最后在整样式

import * as React from "react";
import { Button, TextField, Box, Typography, Divider } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import Dropzone, { useDropzone } from "react-dropzone";
import { agentClient } from "@/app/lib/agent/agent-client";
import { authClient } from "@/app/lib/auth/auth_client";
import FormControlLabel from "@mui/material/FormControlLabel";

import Switch from "@mui/material/Switch";
import { KnowledgeForm } from "@/app/ui/agent/create/knowledge-form";
import Paper from "@mui/material/Paper";
import { UserContext } from "@/app/ui/auth/user-provider";
import { Router } from "next/router";
import { path } from "@/app/lib/path";
import { Topic } from "@/app/lib/agent/types";
import { AgentInfoForm } from "@/app/ui/agent/create/agent-info-form";
import { Container, Stack } from "@mui/material";

// 很明显 我们可以分成两个部分
// 我们可以让左边是填写基础信息的表
// 右边是知识库
// 然后最下面是create的按钮

// TODO: 组件库里面的都没有必要 export default
// 在nextjs app里面的export default是框架需要 它可以直接引用到他们组件 我们不用自己写
// 但是自己的组件库 不应该export defaut 因为不default的语法不一致 这就是最严重的一点
export function CreateAgentForm() {
  const [topics, setTopics] = React.useState<Topic[]>([]);

  // TODO
  // 我们还要使用user
  // 要不还是写一个钩子吧
  // 确认user不是空的
  const { user } = React.useContext(UserContext);
  if (user === null) {
    return <div>loading</div>;
  }

  // 跟knowledge相关的state显然需要在这里创建
  // 然后作为参数传递给创建knowledge的组件
  // 完美！

  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <Container>
        <Stack direction="row" sx={{ width: "100%" }}>
          <Container sx={{ width: "50%" }}>
            <KnowledgeForm topics={topics} setTopics={setTopics} />
          </Container>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "primary.main" }}
          />
          <Container sx={{ width: "50%" }}>
            <AgentInfoForm topics={topics} setTopics={setTopics} user={user} />
          </Container>
        </Stack>
      </Container>
    </>
  );
}
