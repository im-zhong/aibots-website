// 2024/5/22
// zhangzhong

"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { assert } from "console";
import { v4 as uuidv4 } from "uuid";
import { ChatBot } from "@/app/lib/chat/chat_client";
import { Message } from "@/app/lib/chat/types";
import { MessageCard } from "./message-card";

export function InputWindow({
  chatHistory,
  setChathistory,
  chatBot,
}: {
  chatHistory: Message[];
  setChathistory: (chatHistory: Message[]) => void;
  chatBot: MutableRefObject<ChatBot | null>;
}) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleButtonClick = () => {
    const newMessage: Message = {
      // id: chatHistory.length, // or generate a unique id
      // id: Date.now().toString(),
      content: inputValue,
      sender: 1,
      receiver: 2,
      is_start_of_stream: true,
      is_end_of_stream: true,

      // timestamp: new Date().toLocaleString(),
      // add other necessary fields
    };
    setChathistory([...chatHistory, newMessage]);
    setInputValue("");

    chatBot.current?.sendMessage(newMessage);
  };

  // 在这几款度的时候需要考虑到左侧的sidebar
  // 把左侧的像素减掉就ok了
  // Apply the position: 'fixed', bottom: 0, and width: '100%' styles to the Box to ensure it sticks to the bottom and spans the entire width of the viewport
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 250,
          right: 0,
          padding: "10px",
          background: "#fff", // Optional: to match your design
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)", // Optional: adds a shadow above the text field
        }}
      >
        <TextField
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></TextField>
        <Button onClick={handleButtonClick}>post</Button>
      </Box>
    </>
  );
}
