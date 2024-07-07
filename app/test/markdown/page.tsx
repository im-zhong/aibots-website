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

const markdown = `A paragraph with *emphasis* and **strong importance**.

> A block quote with ~strikethrough~ and a URL: https://reactjs.org.

* Lists
* [ ] todo
* [x] done

A table:

| a | b |
| - | - |
`;

const code_markdown = `Here is some JavaScript code:

~~~js
console.log('It works!')
~~~
`;

const math_markdown = `Here is some inline math: $x^2 + y^2 = z^2$`;
// Custom code component for syntax highlighting
const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter style={vscDarkPlus} language={language}>
      {value}
    </SyntaxHighlighter>
  );
};

// 那么我现在又一个问题
// 就是把他们合到一起会发生什么？
function TestPage() {
  return (
    <>
      <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>
      <Markdown
        children={code_markdown}
        components={{
          code(props) {
            const { children, className, node, ref, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            return match ? (
              <SyntaxHighlighter
                {...rest}
                PreTag="div"
                children={String(children).replace(/\n$/, "") + "match"}
                language={match[1]}
                style={dracula}
              />
            ) : (
              <code {...rest} className={className}>
                {children} not match
              </code>
            );
          },
        }}
      />
      <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {math_markdown}
      </Markdown>
    </>
  );
}

const all_markdown = `A paragraph with *emphasis* and **strong importance**.

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

// It works !!! wonderful!!!
export default function Page() {
  return (
    <Markdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      children={all_markdown}
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
