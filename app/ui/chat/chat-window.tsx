// 2024/5/22
// zhangzhong

"use client";
import { useState, useEffect, useRef } from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Container,
  Stack,
} from "@mui/material";
import { assert } from "console";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/app/lib/chat/types";
import { MessageCard } from "./message-card";
import { Agent } from "@/app/lib/agent/agent-client";
import { User } from "@/app/lib/auth/auth_client";

export function ChatWindow({
  chatHistory,
  user,
  agent,
}: {
  chatHistory: Message[];
  user: User;
  agent: Agent;
}) {
  // 在render之间保存聊天历史，需要state
  // 先把静态页面写出来
  // 再写动态页面

  return (
    <Container>
      <Stack direction="column" spacing={2}>
        {chatHistory.map((message) => (
          <MessageCard
            key={uuidv4()}
            message={message}
            user={user}
            agent={agent}
          />
        ))}
      </Stack>
    </Container>
  );
}
