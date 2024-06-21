"use client";

// 上传文件的话就从做成一个单独的API
// 然后这个API返回文件的id
// 然后我们在创建智能体的API里面传入这个文件的id即可
// 这样比较灵活

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
import { KnowledgeForm } from "@/app/ui/agent/knowledge";
import Paper from "@mui/material/Paper";

class Knowledge {
  filename: string;
  id: string;

  constructor({ filename, id }: { filename: string; id: string }) {
    this.filename = filename;
    this.id = id;
  }
}

// TODO: 这个东西应该和CreateAgent一样 或许可以复用之前的类型
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

// TODO: 组件库里面的都没有必要 export default
// 在nextjs app里面的export default是框架需要 它可以直接引用到他们组件 我们不用自己写
// 但是自己的组件库 不应该export defaut 因为不default的语法不一致 这就是最严重的一点
export function CreateAgentForm() {
  const { handleSubmit, control } = useForm<CreateAgentFormData>();

  const onSubmit = async (data: CreateAgentFormData) => {
    console.log(data);
    // const { agent, error } = await agentClient.createAgent({ ...data });
  };

  // 跟knowledge相关的state显然需要在这里创建
  // 然后作为参数传递给创建knowledge的组件
  // 完美！

  const label = { inputProps: { "aria-label": "Switch demo" } };
  return (
    <>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h3" gutterBottom>
          Agent Infomation
        </Typography>
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Name" variant="outlined" {...field} />
          )}
        ></Controller>

        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Description" variant="outlined" {...field} />
          )}
        ></Controller>

        <Controller
          name="prompt"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField label="Prompt" variant="outlined" {...field} />
          )}
        ></Controller>

        <Divider />
        <Typography variant="h3" gutterBottom>
          Is Your could seen by others?
        </Typography>
        <Controller
          name="is_shared"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="is shared?"
              {...field}
            />
          )}
        ></Controller>

        <Divider />
        <Typography variant="h3" gutterBottom>
          Give your Agent Capabilities!
        </Typography>
        <Controller
          name="web_search"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="web search"
              {...field}
            />
          )}
        ></Controller>
        <Controller
          name="painting"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="painting"
              {...field}
            />
          )}
        ></Controller>

        <Controller
          name="multi_model"
          control={control}
          defaultValue={true}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch defaultChecked />}
              label="multi model"
              {...field}
            />
          )}
        ></Controller>

        {/* <Controller
          name="knowledges"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <TextField label="Knowledges" variant="outlined" {...field} />
          )}
        ></Controller> */}

        {
          // 这里需要加入knowledge state
          // 显然我可以写成一个hook
          // 这个部分和form分开
          // 因为knowledge是可以动态增加的，但是表格的filed是固定的
          // 而且knowledge实现起来肯定是需要state的 用form也不好实现
          // 不如作为一个独立的参数 到时候传给api就ok拉
          // 或者拿到数据再组织成 AgentCreate inteface也行
          // const knowledges = useKnowledges();
        }

        <Button variant="contained" type="submit">
          Create
        </Button>
      </Box>

      <KnowledgeForm />
    </>
  );
}
