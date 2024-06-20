"use client";

import * as React from "react";
import { useRouter } from "next/router";
import GuestGuard from "@/app/ui/auth/guest-guard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <GuestGuard>{children}</GuestGuard>;
}
