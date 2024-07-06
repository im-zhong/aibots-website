// 2024/5/22
// zhangzhong

"use client";

import { useState, useEffect, useRef, MutableRefObject } from "react";
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
import { ChatBot } from "@/app/lib/chat/chat_client";
import { Message } from "@/app/lib/chat/types";
import { MessageCard } from "./message-card";

import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MicNoneIcon from "@mui/icons-material/MicNone";
import SendIcon from "@mui/icons-material/Send";

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
          border: "1px solid red",
          position: "fixed",
          bottom: 0,
          left: 250,
          right: 0,
          padding: "10px",
          background: "#fff", // Optional: to match your design
          boxShadow: "0 -2px 10px rgba(0,0,0,0.1)", // Optional: adds a shadow above the text field
        }}
      >
        {/* <TextField
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></TextField>
        <Button onClick={handleButtonClick}>post</Button> */}

        <Stack alignItems="center" justifyContent="center">
          <CustomizedInputBase />
        </Stack>
      </Box>
    </>
  );
}

export function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 600 }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu">
        <ChatBubbleOutlineIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="ask agent ..."
        inputProps={{ "aria-label": "ask agent ..." }}
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <MicNoneIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
