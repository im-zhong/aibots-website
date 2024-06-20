// 2024/6/20
// zhangzhong

"use client";

import { User, authClient } from "@/app/lib/auth/auth_client";
import * as React from "react";

export interface UserContextValue {
  user: User | null;
  error: string | null;
  isLoading: boolean;
  // 最简单的方式就是我们提供一个更新state的函数
  // 只要我们登录或者登出
  // 直接调用一次就ok了
  // 他本质上就是反应当前的状态 而状态通过数据来反映 数据通过API来获取
  // 所以我们可以借助local storage来反映当前的状态
  // 但是反过来，如果不借助local storage
  // 我们怎么知道当前的状态呢？
  // 那就是cookie 我们可以拿到当前的cookie
  // 然后调用 /api/user/me 来判断当前的状态 这样会慢一些但是更安全 也更简单
  // 先按照这种方式实现 然后再实现local storage的方式
  resetUserContext?: () => void;
  updateUserContext?: () => Promise<void>;
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

  console.log("in user provider");
  console.log("user", user);
  console.log("error", user.error);
  console.log("isLoading", user.isLoading);

  const resetUserContext = () => {
    setUser({ user: null, error: null, isLoading: true });
  };

  const updateUserContext = async () => {
    // 我怎么感觉这个effect没有执行呢？
    // 这个effect确实没有执行
    // 因为这是一个比较高的组件，需要刷新整个页面才会执行
    // 这也就是为什么我们刷新一下 就进去agent的原因
    // !!!! 终于找到原因了
    // authguard也需要执行一次check session 也就是获取一下数据，更新一下user context里面的state
    // 这样我们在loginform里面的
    // 不是的，人家是在loginform里面执行的 check session
    // 也就是登录之后就重置一下state的状态 这是最好的
    // 最好在一次state执行过程中尽可能多的更新state 来更少的触发rerender
    // 我悟了！！！
    console.log("run user provider effect");
    // const authClient = new AuthClient();
    // authClient
    //   .getUser()
    //   .then((data) => {
    //     // type script 好像没有pattern match
    //     // 那要是这样，还真不如返回两个东西 {user, error}
    //     // 然后我们可以通过 struct deconstructing 来获取
    //     // 然后每个地方可能是 user: User | null
    //     // 这样就可以用if来判断了
    //     const { user, error } = data;
    //     if (user) {
    //       setUser({ user: user, error: null, isLoading: false });
    //     }
    //     if (error) {
    //       setUser({ user: null, error: error, isLoading: false });
    //     }
    //   })
    //   .catch((error) => {
    //     setUser({ user: null, error: error, isLoading: false });
    //   });

    try {
      const { user, error } = await authClient.getUser();
      console.log("user", user);
      console.log("error", error);
      if (user) {
        setUser({ user: user, error: null, isLoading: false });
      }
      if (error) {
        setUser({ user: null, error: error, isLoading: false });
      }
    } catch (error) {
      setUser({ user: null, error: "unknown error", isLoading: false });
    }

    console.log("get user");
  };

  // 同时这个组件一旦mount，我们立刻调用auth client
  // 所以需要一个effect
  // Effect callbacks are synchronous to prevent race conditions
  React.useEffect(() => {
    updateUserContext().catch((error) => {
      console.error("Error:", error);
    });
  }, []);

  return (
    // 这里有一个错误啊
    // 我们这里的state变化之后，当然要通过我们的value传递下去
    // 所以这里传递的其实就是我们自己的state呀
    <UserContext.Provider
      value={{ ...user, resetUserContext, updateUserContext }}
    >
      {children}
    </UserContext.Provider>
  );
}
