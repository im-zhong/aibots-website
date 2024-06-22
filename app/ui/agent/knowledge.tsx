// 2024/6/21
// zhangzhong
"use client";

import * as React from "react";
import { Button, TextField, Box, Typography, Divider } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import Dropzone, { useDropzone } from "react-dropzone";
import { agentClient } from "@/app/lib/agent/agent-client";
import { authClient } from "@/app/lib/auth/auth_client";
import FormControlLabel from "@mui/material/FormControlLabel";
import { v4 as uuidv4 } from "uuid";
import Switch from "@mui/material/Switch";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

import {
  KnowledgePoint,
  UploadFileForm,
  UploadUrlForm,
} from "@/app/ui/agent/upload-form";
import { knowledgeClient } from "@/app/lib/agent/knowledge-client";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// 对于每一个知识topic
// 有许多知识点
// 那么他需要的参数就是一个 list[string]
// 那么本质上他不需要state
// 因为这个state不是在这个层面发生变化，他只是会根据这些东西渲染不同的页面
// 所以应该作为prop传入
export function KnowledgePanel({
  topic,
  knowledgeId,
}: {
  topic: string;
  knowledgeId: string;
}) {
  // 然后在这里面我们还可以上传文件 和 url
  //

  const [knowledgePoints, setKnowledgePoints] = React.useState<
    KnowledgePoint[]
  >([]);

  const items = knowledgePoints.map((point) => (
    <Item key={point.id}>{point.file_or_url}</Item>
  ));

  return (
    <Paper sx={{ width: "100%" }}>
      <Typography variant="h6" gutterBottom>
        {topic}
      </Typography>
      <Paper>
        <Typography variant="h6" gutterBottom>
          Upload Knowledge points
        </Typography>
        <UploadFileForm
          knowledgeId={knowledgeId}
          setKnowledgePoints={setKnowledgePoints}
        />
        <UploadUrlForm
          knowledgeId={knowledgeId}
          setKnowledgePoints={setKnowledgePoints}
        />
      </Paper>

      <Stack spacing={2}>{items}</Stack>
    </Paper>
  );
}

interface KnowledgeTopic {
  topic: string;
}

// 像这样把setState函数传进来也挺常见的
// 而且说实话也挺合理的
// 因为我们添加了一个知识topic 就需要重绘一次
// 否则我们怎么将数据传递上去呢 只有这一种方式啊
// TODO
export function KnowledgeForm({
  topics,
  setTopics,
}: {
  topics: {
    topic: string;
    knowledgeId: string;
  }[];
  setTopics: React.Dispatch<
    React.SetStateAction<
      {
        topic: string;
        knowledgeId: string;
      }[]
    >
  >;
}) {
  const { handleSubmit, control } = useForm<{ topic: string }>();

  // 首先是一个小的form
  // 就一个输入框 一个按钮
  // 输入框是topic 按钮先发送api 然后setState
  // perfect！
  // 页面结构会跟着数据结构走
  // state其实不用放在上层 放在本层即可
  // 只不过我们需要传入一个agentid
  // 这样我们就知道我们的
  // 算了 这样会显得很奇怪
  // agentid还是上传表单之后再生成把

  // 因为我们每次都会添加一个新的

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

  // 这个地方要怎么实现？
  // 我们需要根据用户的点击来增加knowledge panel
  // In HTML, <form> cannot be a descendant of <form>.
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography variant="h1" gutterBottom>
        Knowledges
      </Typography>

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
      </Box>

      {topics.map(({ topic, knowledgeId }) => (
        <KnowledgePanel
          key={knowledgeId}
          topic={topic}
          knowledgeId={knowledgeId}
        />
      ))}
    </Box>
  );
}
