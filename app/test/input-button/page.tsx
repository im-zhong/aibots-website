// 2024/7/5
// zhangzhong

"use client";

import { InputButton } from "@/app/ui/common/input-button";

export default function Page() {
  const onSubmit = async (data: string) => {
    console.log(data);
  };

  return (
    <InputButton
      name="topic"
      placeholder="new topic to add"
      label="Topic"
      button="ADD"
      onSubmit={onSubmit}
    ></InputButton>
  );
}
