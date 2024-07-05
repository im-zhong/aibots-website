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

import { Divider, Typography } from "@mui/material";
import { BigHeader } from "@/app/ui/common/big-header";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Topics({ topic, agents }: { topic: string; agents: Agent[] }) {
  return (
    <>
      <Stack direction="column" spacing={2}>
        <BigHeader header={topic} />

        <Stack
          direction="row"
          // alignItems="center"
          // justifyContent="center" // Center items along the main-axis
          flexWrap={"wrap"}
          alignItems="flex-start" // Align items at the start of the cross-axis
          justifyContent="center" // Center items along the main-axis
          sx={{
            // margin: "1 auto",
            width: "100%",
            border: "1px solid red",
          }}
        >
          {agents.map((agent) => (
            <Box
              key={agent.id}
              sx={{
                margin: "5px",
              }}
            >
              <AgentCard agent={agent} />
              {/* <Box
                sx={{
                  width: "200px",
                  height: "200px",
                  border: "1px solid black",
                }}
              ></Box> */}
            </Box>
          ))}
        </Stack>
      </Stack>
    </>
  );
}

export default function Page() {
  // 在这里放一些card
  // 可以先放四个

  // 使用一个state来保存agent
  const [agents, setAgents] = React.useState<Agent[]>([]);

  // 每当页面刷新的时候，我们就需要从数据库中获取数个agent
  // 然后在首页进行展示
  // 要不保存在local storage 里面？
  React.useEffect(() => {
    agentClient.listAgents({ limit: 6 }).then(({ agents, error }) => {
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
        <Stack spacing={2}>
          <Topics topic="topic" agents={agents} />
          <Topics topic="topic" agents={agents} />
          <Topics topic="topic" agents={agents} />
          <Topics topic="topic" agents={agents} />
          <Topics topic="topic" agents={agents} />
          <Topics topic="topic" agents={agents} />
          <Topics topic="topic" agents={agents} />
          <Topics topic="topic" agents={agents} />
        </Stack>
      </Container>
    </>
  );
}
