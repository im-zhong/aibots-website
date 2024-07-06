"use client";

import SyntaxHighlighter from "react-syntax-highlighter";
import {
  docco,
  atomOneDark,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

const Component = () => {
  const codeString = "console.log('It works!')";
  return (
    <SyntaxHighlighter language="javascript" style={atomOneDark}>
      {codeString}
    </SyntaxHighlighter>
  );
};

export default function Page() {
  return <Component />;
}
