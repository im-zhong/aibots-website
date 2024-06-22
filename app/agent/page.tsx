"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { AgentCard } from "@/app/ui/agent/agent-card";
import { Agent, agentClient } from "@/app/lib/agent/agent-client";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Page() {
  // 在这里放一些card
  // 可以先放四个

  // 使用一个state来保存agent
  const [agents, setAgents] = React.useState<Agent[]>([]);

  // 每当页面刷新的时候，我们就需要从数据库中获取数个agent
  // 然后在首页进行展示
  // 要不保存在local storage 里面？
  React.useEffect(() => {
    agentClient.listAgents({ limit: 3 }).then(({ agents, error }) => {
      if (error) {
        console.error("Error:", error);
        return;
      }
      console.log(agents);
      setAgents(agents);
    });
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Stack direction="row" spacing={2}>
            {agents.map((agent) => (
              <Item key={agent.id}>
                <AgentCard agent={agent} />
              </Item>
            ))}
          </Stack>
        </Box>
      </Container>
    </>
  );
}
