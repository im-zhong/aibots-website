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
import { UserContext } from "@/app/ui/auth/user-provider";
import { Router } from "next/router";
import { path } from "@/app/lib/path";

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
  const router = useRouter();
  const { handleSubmit, control } = useForm<CreateAgentFormData>();
  const [topics, setTopics] = React.useState<
    { topic: string; knowledgeId: string }[]
  >([]);

  // TODO
  // 我们还要使用user
  // 要不还是写一个钩子吧
  // 确认user不是空的
  const { user } = React.useContext(UserContext);
  if (user === null) {
    return <div>loading</div>;
  }

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

      <KnowledgeForm topics={topics} setTopics={setTopics} />
    </>
  );
}
