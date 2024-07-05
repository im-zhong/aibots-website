// 2024/7/5
// zhangzhong

"use client";

import { Controller, useForm } from "react-hook-form";
import { Button, ButtonGroup, TextField } from "@mui/material";

export default function Page() {
  const { handleSubmit, control } = useForm<{ url: string }>();

  const onSubmit = ({ url }: { url: string }) => alert("hello");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ButtonGroup variant="contained" aria-label="Basic button group">
        <Controller
          name="url"
          control={control}
          render={({ field }) => (
            <TextField label="url" variant="outlined" {...field} />
          )}
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </ButtonGroup>
    </form>
  );
}
