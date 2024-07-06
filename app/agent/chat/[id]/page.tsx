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
import { chatClient, ChatBot } from "@/app/lib/chat/chat_client";
import { Message } from "@/app/lib/chat/types";
import { ChatWindow } from "@/app/ui/chat/chat-window";
import { InputWindow } from "@/app/ui/chat/input-window";
import { AgentCard } from "@/app/ui/agent/agent-card";
import { User } from "@/app/lib/auth/auth_client";
import { Agent } from "@/app/lib/agent/agent-client";

export default function Page({ params }: { params: { id: string } }) {
  // 在第一次渲染组件时建立websocket连接
  // 感觉我们需要写一个类来封装websocket连接

  const user = {
    id: "1",
    name: "Alice",
    email: "email",
    avatar: "avatar",
  } satisfies User;

  const agent = {
    id: "1",
    name: "Alice",
    description: "description",
  } satisfies Agent;

  // no chatbot should be a ref!!!
  const chatBot = useRef<ChatBot | null>(null);

  // TODO: 这个页面明显可以加上skeleton
  // 只要是需要加载的页面都可以这样搞

  // use ref instead of state, because websocket change should not trigger re-render
  // only the change of message should trigger re-render
  // yes dude!

  // const websocket = useRef<WebSocket | null>(null);

  // 还有一件事，就是当我们打开一个旧的聊天历史时，我们需要展示聊天历史
  // 这个功能和chat with bot是不一样的
  // 因为chat with bot是开始一段新的对话，但是在chat with history中，我们需要展示之前的对话
  // 这就意味着 我们需要再添加两个接口
  // 一个是/chat/list
  // 一个是/chat/open 不对 这个不用 我们的/ws/chat接口是支持打开旧的对话的
  // 而且这个页面需要添加一个参数，就是history
  // 或者在页面一开始的时候 通过一个api拿到聊天历史也行
  const [chatHistory, setChathistory] = useState<Message[]>([]);

  useEffect(() => {
    // console.log("run use effect");

    // first get its chat history
    // const { chat, error } = await chatClient.getChat({ id: params.id });
    // if (error || !chat) {
    //   console.error(error);
    //   return;
    // }
    chatClient.getChat({ id: params.id }).then(({ chat, error }) => {
      if (error || !chat) {
        console.error(`get chat error: ${error}`);
        return;
      }

      console.log(`now chat history: ${chat.chat_history}`);
      setChathistory(chat.chat_history);
    });

    // set chat history according to chat

    // const bot = new ChatBot();
    // setChatBot(bot);
    chatBot.current = new ChatBot({ chatId: params.id });
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
  }, [params]);

  // assert(chatBot !== null, "chatBot should not be null");

  return (
    <>
      <Container>
        <Stack direction="column" alignItems="center" spacing={2}>
          <AgentCard agent={agent}></AgentCard>
          <ChatWindow chatHistory={chatHistory} user={user} agent={agent} />
          <InputWindow
            chatHistory={chatHistory}
            setChathistory={setChathistory}
            // 不对，我想起来了，effect是在整个组件渲染完之后才会执行的
            // 所以这里要传递整个ref才行
            chatBot={chatBot}
          />
        </Stack>
      </Container>
    </>
  );
}
