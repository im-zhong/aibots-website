// 2024/6/20
// zhangzhong

"use client";

import { User, AuthClient } from "@/app/lib/auth/auth_client";
import * as React from "react";

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
}

export const UserContext = React.createContext<UserContextValue>({
  user: null,
  error: null,
  isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  // 现在要实现的就是，如果用户没有登录，那么就跳出
  // 但是不是在这里实现，这里做的就是调用auth client
  // 然后看看返回用户是否登录
  // 然后之后的auth guard和guest guard会使用这个这个信息 来作出之后的处理
  // 然后用户是否登录确实会影响组件的状态，所以显然这是一个state
  const [user, setUser] = React.useState<UserContextValue>({
    user: null,
    error: null,
    isLoading: true,
  });

  // 同时这个组件一旦mount，我们立刻调用auth client
  // 所以需要一个effect
  // Effect callbacks are synchronous to prevent race conditions
  React.useEffect(() => {
    const authClient = new AuthClient();
    authClient
      .getUser()
      .then((data) => {
        // type script 好像没有pattern match
        // 那要是这样，还真不如返回两个东西 {user, error}
        // 然后我们可以通过 struct deconstructing 来获取
        // 然后每个地方可能是 user: User | null
        // 这样就可以用if来判断了
        const { user, error } = data;
        if (user) {
          setUser({ user: user, error: null, isLoading: false });
        }
        if (error) {
          setUser({ user: null, error: error, isLoading: false });
        }
      })
      .catch((error) => {
        setUser({ user: null, error: error, isLoading: false });
      });
  }, []);

  return (
    // 这里有一个错误啊
    // 我们这里的state变化之后，当然要通过我们的value传递下去
    // 所以这里传递的其实就是我们自己的state呀
    <UserContext.Provider value={{ ...user }}>{children}</UserContext.Provider>
  );
}
