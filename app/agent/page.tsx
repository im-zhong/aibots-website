"use client";

import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import AgentCard from "@/app/ui/agent/agent-card";

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
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: "#cfe8fc", height: "100vh" }}>
          <Stack direction="row" spacing={2}>
            <Item>
              <AgentCard />
            </Item>
            <Item>
              <AgentCard />
            </Item>
            <Item>
              <AgentCard />
            </Item>
          </Stack>
        </Box>
      </Container>
    </>
  );
}
