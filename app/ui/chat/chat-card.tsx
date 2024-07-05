// 2024/7/5
// zhangzhong

"use client";

import * as React from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Avatar,
  Typography,
  Stack,
  Button,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";

import { Message, Chat } from "@/app/lib/chat/types";
import { Agent, agentClient } from "@/app/lib/agent/agent-client";
import { path } from "@/app/lib/path";

export function ChatCard({ chat }: { chat: Chat }) {
  // TMD 这里还需要根据agentid拿到agent的信息啊
  // 更好，这样每个模块拿自己的 那就是并行的 很快啊
  const router = useRouter();
  const [agent, setAgent] = React.useState<Agent | null>(null);

  // 如果有错误，那么我们直接不渲染 不久ok拉 nice

  React.useEffect(() => {
    console.log("call effect");

    const getAgent = async () => {
      const { agent, error } = await agentClient.getAgent({
        id: chat.agent_id,
      });

      setAgent(agent ?? null);
    };

    getAgent().finally(() => {});
  }, [chat]);

  const handleClick = () => {
    // console.log("click chat");

    console.log(`click chat ${chat.id}`);
    router.push(`${path.agent.chat}/${chat.id}`);
  };

  // TODO: 不对啊，聊天应该按照最后修改的时间排序才对，创建时间没有用啊
  if (!agent) {
    return <></>;
  }

  let latest_message = "latest message ...";
  if (chat.chat_history.length > 0) {
    latest_message = chat.chat_history[0].content;
  }

  return (
    <Card sx={{ minWidth: 800 }}>
      <CardHeader
        avatar={<Avatar>Agent</Avatar>}
        title={agent.name}
        subheader={chat.create_at}
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
        }
      />

      <CardContent>
        <Typography variant="body2">{latest_message}</Typography>
      </CardContent>
    </Card>
  );
}
