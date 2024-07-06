// 2024/7/6
// zhangzhong

"use client";

import * as React from "react";
import { MarkdownField } from "@/app/ui/chat/markdown-field";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Container,
} from "@mui/material";

export default function Page() {
  const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |

Here is some JavaScript code:

~~~js
console.log('It works!')
~~~

Here is some inline math: $x^2 + y^2 = z^2$
`;

  return (
    <Container
      sx={{
        width: 400,
        backgroundColor: "yellow",
      }}
    >
      <MarkdownField markdown={markdown} />
    </Container>
  );
}
