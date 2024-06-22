// 2024/5/22
// zhangzhong

"use client";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { assert } from "console";
import { v4 as uuidv4 } from "uuid";
import { Message, ChatBot } from "@/app/lib/chat/chat_client";

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

    chatBot.current.sendMessage(newMessage);
  };

  return (
    <>
      <Box
        // component="form"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></TextField>
        <Button onClick={handleButtonClick}>post</Button>
      </Box>
    </>
  );
}
