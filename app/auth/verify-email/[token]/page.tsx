// 2024/5/22
// zhangzhong

// "use client";

import { notFound, redirect } from "next/navigation";

export default async function Page({ params }: { params: { token: string } }) {
  // use Effect
  // 在这个页面渲染的完成渲染的第一次，发送确认邮件的请求
  // 然后在收到确认之后，跳转到登录页面

  // const router = useRouter();

  // throw new Error("token not found");

  // 好像不用用effect
  //   useEffect(() => {
  //     // notFound();
  //     async function verifyToken() {
  //       const response = await fetch("http://localhost:8000/api/auth/verify", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ token: params.token }),
  //       });
  //       // if (!response.ok) {
  //       //   console.log(response.ok);
  //       //   notFound();
  //       // }
  //       // return response;
  //       return response;
  //     }

  //     verifyToken().then((response) => {
  //       if (response.ok) {
  //         router.push("/auth/login");
  //       } else {
  //         throw new Error("token not found");
  //       }
  //     });
  //   }, [router, params]);

  const response = await fetch("http://localhost:8000/api/auth/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: params.token }),
  });

  if (response.ok) {
    redirect("/auth/login");
  } else {
    notFound();
  }

  //   const response = await fetch("http://localhost:8000/api/auth/verify", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ token: params.token }),
  //   });

  //   async function verifyToken() {
  //     const response = await fetch("http://localhost:8000/api/auth/verify", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ token: params.token }),
  //     });
  //     // if (!response.ok) {
  //     //   console.log(response.ok);
  //     //   notFound();
  //     // }
  //     // return response;
  //     return response;
  //   }

  //   // const is_not_found = false;
  //   // notFound();

  //   verifyToken().then((response) => {
  //     if (response.ok) {
  //       router.push("/auth/login");
  //     } else {
  //       throw new Error("token not found");
  //     }
  //   });

  return <></>;
}
