// 2024/5/22
// zhangzhong

"use client";
import { useState, useEffect, useRef } from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { assert } from "console";
import { v4 as uuidv4 } from "uuid";
import { Message } from "@/app/lib/chat/chat_client";

function MessageBox({ key, message }: { key: string; message: Message }) {
  // 可以用mui的typography组件
  return (
    <Paper>
      <Typography>{`${message.sender}: ${message.content}`}</Typography>
    </Paper>
  );
}

export function ChatWindow({ chatHistory }: { chatHistory: Message[] }) {
  // 在render之间保存聊天历史，需要state
  // 先把静态页面写出来
  // 再写动态页面

  return (
    <>
      <Paper>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            // alignItems: "center",
            // height: "100vh",
            gap: 2,
          }}
        >
          {chatHistory.map((message) => (
            <MessageBox key={uuidv4()} message={message} />
          ))}
        </Box>
      </Paper>
    </>
  );
}
