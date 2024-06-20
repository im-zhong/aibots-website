// 2024/5/22
// zhangzhong

"use client";
import { useState, useEffect, useRef } from "react";
import { Box, Paper, TextField, Typography, Button } from "@mui/material";
import { assert } from "console";
import { v4 as uuidv4 } from "uuid";

interface Message {
  sender: number;
  receiver: number;
  is_start_of_stream: boolean;
  is_end_of_stream: boolean;
  content: string;
}

class ChatBot {
  websocket: WebSocket;
  constructor() {
    this.websocket = new WebSocket("ws://localhost:8000/ws/chat");
    // this.websocket.onmessage = (event) => {
    //   const message = JSON.parse(event.data);
    //   console.log(message);
    //   // append message to last chat history
    // };
  }

  sendMessage(message: Message) {
    this.websocket.send(JSON.stringify(message));
  }
}

function MessageBox({ key, message }: { key: string; message: Message }) {
  // 可以用mui的typography组件
  return (
    <Paper>
      <Typography>{`${message.sender}: ${message.content}`}</Typography>
    </Paper>
  );
}

function ChatWindow({ chatHistory }: { chatHistory: Message[] }) {
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
            alignItems: "center",
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

function InputWindow({
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

export default function Page() {
  // 在第一次渲染组件时建立websocket连接
  // 感觉我们需要写一个类来封装websocket连接

  // no chatbot should be a ref!!!
  const chatBot = useRef<ChatBot | null>(null);

  // use ref instead of state, because websocket change should not trigger re-render
  // only the change of message should trigger re-render

  // const websocket = useRef<WebSocket | null>(null);

  const [chatHistory, setChathistory] = useState<Message[]>([
    {
      // id: "1",
      content: "你好",
      sender: 2,
      receiver: 1,
      is_start_of_stream: true,
      is_end_of_stream: true,
      // timestamp: "2024-5-22 10:00",
    },
    {
      // id: "2",
      content: "你好",
      sender: 1,
      receiver: 2,
      is_start_of_stream: true,
      is_end_of_stream: true,
      // timestamp: "2024-5-22 10:01",
    },
    {
      // id: "3",
      content: "你好",
      sender: 2,
      receiver: 1,
      is_start_of_stream: true,
      is_end_of_stream: true,
      // timestamp: "2024-5-22 10:02",
    },
    {
      // id: "4",
      content: "你好",
      sender: 1,
      receiver: 2,
      is_start_of_stream: true,
      is_end_of_stream: true,
      // timestamp: "2024-5-22 10:03",
    },
  ]);

  useEffect(() => {
    // console.log("run use effect");

    // const bot = new ChatBot();
    // setChatBot(bot);
    chatBot.current = new ChatBot();
    chatBot.current.websocket.onopen = () => {
      console.log("connected");
    };

    chatBot.current.websocket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      console.log(message);
      // 支持stream

      setChathistory((prevChatHistory) => {
        if (message.is_start_of_stream) {
          // console.log(`current messages: ${prevChatHistory}`);
          // why twice?
          console.log("start of stream");
          return [...prevChatHistory, message];
        } else {
          // get last element

          const last_message = prevChatHistory[prevChatHistory.length - 1];
          console.log(`current last message: ${last_message.content}`);
          console.log(`current message: ${message.content}`);
          const append_last_message = last_message.content + message.content;
          last_message.content = append_last_message;
          console.log(`append last message: ${last_message.content}`);
          return [...prevChatHistory];
        }

        // start of stream
        // end of stream
        // 如果可以支持这两个参数的话， 我们这边实现起来要简单非常多了

        // if (message.is_end_of_stream) {
        //   return [...prevChatHistory, message];
        // } else {
        //   return prevChatHistory.map((msg) => {
        //     if (msg.sender === message.sender) {
        //       return message;
        //     } else {
        //       return msg;
        //     }
        //   });
        // }
      });
    };
    // setChatHistory不只可以接受数据，还可以接受一个函数
    // 这样我们就可以拿到之前的聊天历史了

    // effect 需要制定close函数清理函数
    return () => {
      // bot.websocket.onmessage = null;
      chatBot.current?.websocket.close();
    };
  }, []);

  // assert(chatBot !== null, "chatBot should not be null");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          gap: 2,
        }}
      >
        <ChatWindow chatHistory={chatHistory} />
        <InputWindow
          chatHistory={chatHistory}
          setChathistory={setChathistory}
          // 不对，我想起来了，effect是在整个组件渲染完之后才会执行的
          // 所以这里要传递整个ref才行
          chatBot={chatBot}
        />
      </Box>
    </>
  );
}
