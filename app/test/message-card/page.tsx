// 2024/7/6
// zhangzhong

"use client";

import { Container } from "@mui/material";
import { MessageCard } from "@/app/ui/chat/message-card";
import { Message } from "@/app/lib/chat/types";
import { Agent } from "@/app/lib/agent/agent-client";
import { User } from "@/app/lib/auth/auth_client";

export default function Page() {
  const message = {
    sender: 1,
    receiver: 2,
    is_start_of_stream: false,
    is_end_of_stream: false,
    content: "Hello, world",
  } as Message;

  const user = {
    id: "1",
    name: "Alice",
  } as User;

  const agent = {
    id: "2",
    name: "Bob",
  } as Agent;

  return (
    <Container>
      <MessageCard message={message} user={user} agent={agent} />
    </Container>
  );
}
