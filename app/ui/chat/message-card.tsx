// 2024/7/6
// zhangzhong

"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Avatar,
  IconButton,
  Paper,
  Snackbar,
  Alert,
  Divider,
  Typography,
  Container,
} from "@mui/material";
import { Message } from "@/app/lib/chat/types";
import { Agent } from "@/app/lib/agent/agent-client";
import { User } from "@/app/lib/auth/auth_client";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import { MarkdownField } from "./markdown-field";

export function MessageCard({
  message,
  user,
  agent,
}: {
  message: Message;
  user: User;
  agent: Agent;
}) {
  // 不对啊，我们在聊天的时候，需要获取到user和agent 两个东西才行
  // 在页面的右上角可以有一个复制的按钮 用来复制整个内容

  const [open, setOpen] = React.useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      console.log("Message copied to clipboard");
    } catch (err) {
      console.error("Failed to copy message: ", err);
    }

    setOpen(true);

    // 这里最好是可以在弹一个提示，表示内容已经复制到剪贴板了
    // https://mui.com/material-ui/react-snackbar/
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            {String(message.sender) === agent.id ? "Agent" : "You"}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <ContentCopyIcon />
            <Snackbar
              open={open}
              autoHideDuration={1000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                copy content to clipboard
              </Alert>
            </Snackbar>
          </IconButton>
        }
        title={String(message.sender) === agent.id ? agent.name : user.name}
        subheader="September 14, 2016"
      />
      <Divider />
      <CardContent
        sx={{
          padding: 0,
          margin: 0,
          border: "1px solid red",
          backgroundColor: "yellow",
          "&:last-child": {
            // Targeting the last-child pseudo-class can help remove padding applied by Material-UI
            paddingBottom: 0,
          },
        }}
      >
        <Container>
          <MarkdownField markdown={message.content}></MarkdownField>
        </Container>
      </CardContent>
    </Card>
  );
}
