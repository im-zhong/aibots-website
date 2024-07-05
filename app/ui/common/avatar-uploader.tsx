// 2024/7/5
// zhangzhong

"use client";
import * as React from "react";
import { Avatar, Button, Stack } from "@mui/material";

export function AvatarUploader() {
  // 那这么看起来 ref有点像 getElementById 这种API
  // 可以随意的拿到任何一个元素，但是绝对不能滥用啊 否则会导致ref满天飞
  const fileInputRef = React.useRef<HTMLInputElement>(null); // Step 1

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      // take the first image
      const file = files[0];
      console.log(file.name);
    } else {
      console.log("no file");
    }
  };

  const handleClick = () => {
    // Step 3
    fileInputRef.current?.click(); // Programmatically click the file input
  };

  // the Button component inside the label does not automatically trigger the file selection dialog
  // because the Button component does not naturally propagate the click event to its parent label element
  // in the way a native HTML button or other inline elements might
  return (
    <Stack direction="column" alignItems="center" spacing={1}>
      <input
        ref={fileInputRef} // Step 2
        type="file"
        id="avatar"
        name="avatar"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
      <Avatar onClick={handleClick}>A</Avatar>
      <Button onClick={handleClick}>upload avatar</Button>
    </Stack>
  );
}
