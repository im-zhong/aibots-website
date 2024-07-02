// 2024/6/20
// zhangzhong

import * as React from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/ui/auth/user-provider";
import { path } from "@/app/lib/path";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  // use router
  const router = useRouter();
  // use contect
  // 应该是登出的时候没有重置UserContext的状态导致的bug
  // 在最开始的时候 isLoading 为 true
  // user和error应该都是null才对
  const { user, error, isLoading } = React.useContext(UserContext);
  console.log("user", user);
  console.log("error", error);
  console.log("isLoading", isLoading);

  console.log("in auth guard");

  // auth guard使用的是条件渲染
  // 只有当我们确实成功登录的时候，才可以渲染children
  // 所以这里也有一个state
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  console.log("isAuthenticated", isAuthenticated);

  // 同时我们也需要在一开始就判断一下 是否成功认证了
  // 那显然也需要一个effect
  React.useEffect(() => {
    console.log("in auth guard effect");
    // 首先，我们必须等待用户信息加载完毕，否则一切免谈
    if (isLoading) {
      return;
    }

    // 然后，我们判断是否没有错误
    if (error) {
      // 我们也有可能本来是登录的，但是现在登出了
      // 所以我们也要跳转到登录页面
      // 感觉这个点特别容易漏啊
      setIsAuthenticated(false);
      console.log("error", error);
      // 如果有错误，我们就跳转到登录页面
      router.push(path.index);
      return;
    }

    // 否则 说明我们正常登录
    // 我们设置 isAuthenticated 为 true
    // rerender children
    setIsAuthenticated(true);
  }, [isLoading, error, router]);

  return <>{isAuthenticated && children}</>;
}
