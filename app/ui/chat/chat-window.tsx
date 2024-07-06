// 2024/5/22
// zhangzhong

"use client";
import * as React from "react";
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

  const bottomRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <Container
      sx={{
        width: "60%",
      }}
    >
      <Stack direction="column" spacing={2}>
        {chatHistory.map((message) => (
          <MessageCard
            key={uuidv4()}
            message={message}
            user={user}
            agent={agent}
          />
        ))}
        {
          // 哪一个东西垫一下，否则最新的消息会被输入框遮住
          // 刚好可以作为scrolldown的目标 一举两得！
        }
        <div
          ref={bottomRef}
          style={{
            width: 100,
            height: 55,
          }}
        ></div>
      </Stack>
    </Container>
  );
}
