// 2024/6/22
// zhangzhong
// list my recent chats

"use client";

import * as React from "react";
import { Message, Chat } from "@/app/lib/chat/types";
import { chatClient } from "@/app/lib/chat/chat_client";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Divider,
  Stack,
  Container,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { path } from "@/app/lib/path";
import { ChatCard } from "@/app/ui/chat/chat-card";
import { BigHeader } from "@/app/ui/common/big-header";

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
    <Container>
      <Stack direction="column" spacing={2}>
        {/* <BigHeader header="latest chats" /> */}
        {chats.map((chat) => (
          <ChatCard key={chat.id} chat={chat} />
        ))}
      </Stack>
    </Container>
  );
}
