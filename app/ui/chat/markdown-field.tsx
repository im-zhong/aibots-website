/* eslint-disable react/no-children-prop */
// 2024/7/6
// zhangzhong

"use client";

import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vscDarkPlus,
  oneDark,
  dracula,
} from "react-syntax-highlighter/dist/esm/styles/prism";

import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import "katex/dist/katex.min.css"; // `rehype-katex` does not import the CSS for you

import {
  docco,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

export function MarkdownField({ markdown }: { markdown: string }) {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      children={markdown}
      components={{
        code(props) {
          const { children, className, node, ref, ...rest } = props;
          const match = /language-(\w+)/.exec(className || "");
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag="div"
              children={String(children).replace(/\n$/, "")}
              language={match[1]}
              style={dracula}
              showLineNumbers={true} // Enable line numbers
              lineNumberStyle={
                {
                  // color: "#aaa",
                  // minWidth: "2em",
                  // paddingRight: "2em",
                  // textAlign: "right",
                }
              } // Optional: Customize line number style
            />
          ) : (
            <code {...rest} className={className}>
              {children} not match
            </code>
          );
        },
      }}
    />
  );
}
