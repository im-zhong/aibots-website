"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { Divider } from "@mui/material";
import { Agent } from "@/app/lib/agent/agent-client";
import { chatClient } from "@/app/lib/chat/chat_client";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/ui/auth/user-provider";
import { path } from "@/app/lib/path";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export function AgentCard({ agent }: { agent: Agent }) {
  const router = useRouter();
  const { user } = React.useContext(UserContext);
  if (!user) {
    return null;
  }

  const handleClick = async () => {
    // 只要一点击，我们就首先创建一个chat
    // 然后在进入真正的chat页面 岂不完美！哈哈
    const { chat_id, error } = await chatClient.createChat({
      user_id: user.id,
      agent_id: agent.id,
    });
    if (error) {
      console.error("Error:", error);
      return;
    }
    if (!chat_id) {
      console.error("Error: chat_id is null");
      return;
    }

    router.push(`${path.agent.chat}/${chat_id}`);
  };

  return (
    <Card sx={{ width: 200, height: 200 }}>
      <CardContent>
        <Avatar>Agent</Avatar>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Agent Name: {agent.name}
        </Typography>
        <Divider />
        <Typography variant="body2">
          A long long long long long long long long long long long long long
          long agent description: {agent.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleClick}>
          Chat with it
        </Button>
      </CardActions>
    </Card>
  );
}
