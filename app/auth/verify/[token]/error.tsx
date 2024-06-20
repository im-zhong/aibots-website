// 2024/5/22
// zhangzhong

"use client";

import { useEffect } from "react";

export default function Error({
  error, // This object is an instance of JavaScript's native Error object.
  reset, // This is a function to reset the error boundary. When executed, the function will try to re-render the route segment.
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
  return (
    <>
      <p>404! Could not find your verification token!</p>
    </>
  );
}
