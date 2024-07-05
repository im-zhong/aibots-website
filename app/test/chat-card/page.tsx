// 2024/7/5
// zhangzhong

"use client";

import { ChatCard } from "@/app/ui/chat/chat-card";
import { Message, Chat } from "@/app/lib/chat/types";
import { Box, Typography } from "@mui/material";

export default function Page() {
  const chat: Chat = {
    id: "1",
    user_id: "1",
    agent_id: "1",
    create_at: "2024/7/5 23:30:26",
    chat_history: [
      {
        sender: 1,
        receiver: 1,
        is_start_of_stream: true,
        is_end_of_stream: false,
        content: "hello",
      },
    ],
  };

  return (
    <Box>
      <Typography>test</Typography>
      <ChatCard chat={chat} />
    </Box>
  );
}
