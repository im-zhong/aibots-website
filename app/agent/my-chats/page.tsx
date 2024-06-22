// 2024/6/22
// zhangzhong
// list my recent chats

"use client";

import * as React from "react";
import { Message, Chat, chatClient } from "@/app/lib/chat/chat_client";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { path } from "@/app/lib/path";

export default function Page() {
  const [chats, setChats] = React.useState<Chat[]>([]);
  const router = useRouter();

  React.useEffect(() => {
    const getChats = async () => {
      const { chats, error } = await chatClient.listChats({ limit: 10 });

      if (error) {
        console.error(error);
        return;
      }

      if (!chats) {
        console.error("chats is undefined");
        return;
      }

      console.log(chats);
      setChats(chats);
    };

    getChats().catch((error) => {
      console.error(error);
    });
  }, []);

  // 这里必须使用closure了
  // 因为我们的chat需要通过外部传进来
  const handleClick = ({ chat }: { chat: Chat }) => {
    // console.log("click chat");
    return () => {
      console.log(`click chat ${chat.id}`);
      router.push(`${path.agent.chat}/${chat.id}`);
    };
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          gap: 2,
        }}
      >
        <Typography variant="h1">My Chats</Typography>
        <Divider />
        {chats.map((chat) => (
          <Paper
            key={chat.id}
            onClick={handleClick({ chat: chat })}
            sx={{ padding: 2, width: "50%" }}
          >
            <Typography>{chat.id}</Typography>
            <Typography>{chat.user_id}</Typography>
            <Typography>{chat.agent_id}</Typography>
          </Paper>
        ))}
      </Box>
    </>
  );
}
