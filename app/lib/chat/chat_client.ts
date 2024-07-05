// 2024/6/22
// zhangzhong

import { api } from "@/app/lib/api";
import { getToken } from "@/app/lib/common/token";
import { Message, Chat } from "./types";

// 我们需要在这里实现chat的websocket

class ChatClient {
  async createChat({
    user_id,
    agent_id,
  }: {
    user_id: string;
    agent_id: string;
  }): Promise<{ chat_id?: string; error?: string }> {
    try {
      const response = await fetch(api.chat.create.url, {
        method: api.chat.create.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          user_id,
          agent_id,
        }),
      });

      const data = await response.json();
      console.log(data);

      switch (response.status) {
        case 200:
          return { chat_id: data as string };
        case 422:
          return { error: "Validation Error" };
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      return { error: String(error) };
    }
  }

  async listChats({
    limit,
  }: {
    limit: number;
  }): Promise<{ chats?: Chat[]; error?: string }> {
    try {
      const queryString = `limit=${encodeURIComponent(limit)}`;
      const urlWithParams = `${api.chat.list.url}?${queryString}`;
      const response = await fetch(urlWithParams, {
        method: api.chat.list.method,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();
      console.log(data);

      switch (response.status) {
        case 200:
          return { chats: data as Chat[] };
        case 422:
          return { error: "Validation Error" };
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      return { error: String(error) };
    }
  }

  async getChat({
    id,
  }: {
    id: string;
  }): Promise<{ chat?: Chat; error?: string }> {
    try {
      const response = await fetch(`${api.chat.get.url}/${id}`, {
        method: api.chat.get.method,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();
      console.log(data);

      switch (response.status) {
        case 200:
          return { chat: data as Chat };
        case 422:
          return { error: "Validation Error" };
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      return { error: String(error) };
    }
  }
}

export const chatClient = new ChatClient();

export class ChatBot {
  websocket: WebSocket;
  constructor({ chatId }: { chatId: string }) {
    const token = encodeURIComponent(getToken()); // Ensure the token is URL-encoded
    this.websocket = new WebSocket(
      `${api.chat.ws.url}?chat_id=${chatId}&token=${token}`
    );
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
