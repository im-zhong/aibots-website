// 2024/5/22
// zhangzhong

"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/app/lib/auth/auth_client";
import * as React from "react";

export default function Page({ params }: { params: { token: string } }) {
  const router = useRouter();

  React.useEffect(() => {
    authClient.verify({ token: params.token }).then(({ error }) => {
      if (error) {
        console.error("Error:", error);
        return;
      }
      router.replace("/auth/login");
    });
  }, [router, params.token]);

  return <></>;
}
