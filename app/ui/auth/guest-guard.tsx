// 2024/6/20
// zhangzhong

import * as React from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/app/ui/auth/user-provider";

// 感觉没有必要的
// 对于guest也直接用AuthGuard不就行了吗
// 他们在不退出登录的情况下，无法访问auth相关的页面，如登录，注册，忘记密码
// 不过也不对啊，为什么我在登录的情况下就不能注册？
// 不太合理啊
// 感觉是没有必要的
// 不写了吧
export default function GuestGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  // use router
  const router = useRouter();
  // use contect
  const { user, error, isLoading } = React.useContext(UserContext);

  // auth guard使用的是条件渲染
  // 只有当我们确实成功登录的时候，才可以渲染children
  // 所以这里也有一个state
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);

  // 同时我们也需要在一开始就判断一下 是否成功认证了
  // 那显然也需要一个effect
  React.useEffect(() => {
    // 首先，我们必须等待用户信息加载完毕，否则一切免谈
    if (isLoading) {
      return;
    }

    // 然后，我们判断是否没有错误
    if (user) {
      // 我们也有可能本来是登录的，但是现在登出了
      // 所以我们也要跳转到登录页面
      // 感觉这个点特别容易漏啊
      setIsAuthenticated(true);
      // 如果有错误，我们就跳转到登录页面
      router.replace("/agent");
      return;
    }

    // 否则 说明我们正常登录
    // 我们设置 isAuthenticated 为 true
    // rerender children
    setIsAuthenticated(false);
  }, [isLoading, user, router]);

  return <>{!isAuthenticated && children}</>;
}

// 不过如果我们在已经登录的情况下，再次访问auth相关的页面
// 直接把我们导向主页会好许多
// 所以使用一个AuthGuard包住就ok啦
// 不对啊，这就是guest guard呀。。。
