// 2024/7/5
// zhangzhong

"use client";

import * as React from "react";
import { Button, TextField, Stack, ButtonGroup } from "@mui/material";
import { Controller, useForm, FieldValues, Path } from "react-hook-form";

interface InputButtonProps {
  placeholder: string;
  label: string;
  button: string;
  onSubmit: (data: string) => Promise<void>; // Use generic type for onSubmit
}

export function InputButton({
  placeholder,
  label,
  button,
  onSubmit,
}: InputButtonProps) {
  // 哦 这里需要指定一个上传的字段
  // 我们所有的类型都是上传一个字段，就是以name为名的一个dict
  // 但是这个类型肯定只能是外部传进来
  // 最简单的方式可能是用zod来自动生成类型？
  // 不行 就算是zod 也需要显示的写出类型
  // 那么能不能通过参数来传递一个类型呢？范型！
  const [inputValue, setInputValue] = React.useState<string>("");

  // 不对啊 我根本就没有调这个函数啊
  // 好像mui的textfield会自动处理enter按下的事件
  // const handleKeyDown = (event: React.KeyboardEvent) => {
  //   if (event.key === "Enter" && !event.shiftKey) {
  //     event.preventDefault();
  //     handleSubmit(onSubmit)();
  //   }
  // };

  const handleClick = async () => {
    await onSubmit(inputValue);
    setInputValue("");
  };

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // why I can not get the data from the from?
    // why the data in undefined?
    // console.log("mySubmit", inputValue);
    await handleClick();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("onChange", e.target.value);
    setInputValue(e.target.value);
  };

  const onKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      // Check if Enter is pressed without the Shift key
      event.preventDefault(); // Prevent default to avoid a new line in textarea for example
      // sendMessage(inputValue); // Assuming sendMessage is your function to handle sending messages
      // setInputValue(""); // Clear the input field
      await handleClick();
    }
  };

  return (
    <ButtonGroup fullWidth>
      <TextField
        fullWidth
        placeholder={placeholder}
        onChange={onChange} // Update inputValue on change
        onKeyDown={onKeyDown} // Handle enter key press
        value={inputValue}
        label={label}
        variant="outlined"
      />

      <Button
        sx={{
          maxWidth: "70px",
        }}
        variant="contained"
        type="submit"
        onClick={onClick}
      >
        {button}
      </Button>
    </ButtonGroup>
  );
}
