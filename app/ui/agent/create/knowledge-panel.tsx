"use client";

import * as React from "react";
import { Button, TextField, Box, Typography, Divider } from "@mui/material";
import { Controller, useForm, UseFormHandleSubmit } from "react-hook-form";
import { Link } from "@mui/material";
import { useRouter } from "next/navigation";
import Dropzone, { useDropzone } from "react-dropzone";
import { agentClient } from "@/app/lib/agent/agent-client";
import { authClient } from "@/app/lib/auth/auth_client";
import FormControlLabel from "@mui/material/FormControlLabel";
import { v4 as uuidv4 } from "uuid";
import Switch from "@mui/material/Switch";

import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccordionActions from "@mui/material/AccordionActions";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Topic, KnowledgePoint } from "@/app/lib/agent/types";

import { FilePanel } from "./file-panel";
import { URLPanel } from "./url-panel";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// 对于每一个知识topic
// 有许多知识点
// 那么他需要的参数就是一个 list[string]
// 那么本质上他不需要state
// 因为这个state不是在这个层面发生变化，他只是会根据这些东西渲染不同的页面
// 所以应该作为prop传入
export function KnowledgePanel({ topic }: { topic: Topic }) {
  // 然后在这里面我们还可以上传文件 和 url
  //

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls={`${topic.knowledgeId}-content`}
        id={`${topic.knowledgeId}-header`}
      >
        <Typography>{topic.topic}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="row" spacing={2}>
          <FilePanel knowledgeId={topic.knowledgeId} />
          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "primary.main" }}
          />
          <URLPanel knowledgeId={topic.knowledgeId} />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
