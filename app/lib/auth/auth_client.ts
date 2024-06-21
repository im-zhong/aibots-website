// 2024/6/20
// zhangzhong
// 简单的说就是封装我们自己的/api/auth系列还有/api/user/* 系列的API

// 在这里定义User的类型

import { api } from "@/app/lib/api";

// TODO: 拿到user的信息之后可以保存在localStorage里面，这样后续就不用一只请求API拿数据了
export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface UserCreate {
  name: string;
  email: string;
  password: string;
}

export interface Credentials {
  access_token: string;
  token_type: string;
}

// get token or throw
function getToken() {
  const token = localStorage.getItem("token");
  if (token === null) {
    throw new Error("No token");
  }
  return token;
}

export class AuthClient {
  // 登录成功之后，浏览器会保存一个cookie
  // 但是我们也可能登录失败呀
  // 所以方法需要返回一个bool值，和error
  // 这样调用方可以知道成功，失败的原因/
  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-login
  // https://fastapi-users.github.io/fastapi-users/latest/configuration/authentication/transports/bearer/#login
  async login(username: string, password: string): Promise<{ error?: string }> {
    try {
      // Handle login logic here
      // use fecthAPI to cal api
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
      const response = await fetch(api.auth.login.url, {
        method: api.auth.login.method,
        // mode: "cors",
        // cache: "no-cache",
        // credentials: "same-origin",
        headers: {
          // The Content-Type header is set to application/x-www-form-urlencoded to indicate that the body contains URL-encoded form data.
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // data is an object containing the username and password.
        // This object is converted to a URL-encoded string using URLSearchParams and included in the body of the POST request
        body: new URLSearchParams({
          username: username,
          password: password,
          // grant_type: "password",
          // scope: "read write", // adjust this according to your API's scope
        }),
        // ndicate that cookies should be sent with the request, even for cross-origin calls
        // credentials: "include",
      });

      const data = await response.json();
      switch (response.status) {
        case 200:
          // we should store the credentials in the local storage
          // local storage can only store strings
          // so we only store the token is ok
          localStorage.setItem("token", (data as Credentials).access_token);
          return {};
        case 400:
          return { error: data.detail as string };
        case 422:
          return { error: "Validation Error" };
        default:
          return { error: String(response) };
      }

      // first check the response status code
      // if (response.status === 200) {
      //   console.log("login success");
      //   // 这里就需要返回credentials了
      //   return { credentials: (await response.json()) as Credentials };
      // }
      // const json = await response.json();
      // console.log(json);
      // // get the detial error message
      // return json.detail as string;
    } catch (error) {
      console.error("Error:", error);
      return { error: String(error) };
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-logout
  // https://fastapi-users.github.io/fastapi-users/latest/configuration/authentication/transports/bearer/#logout
  async logout(): Promise<{ error?: string }> {
    try {
      // TODO:
      // 从获取token到调用API很明显有非常多的冗余
      // 这个要重构一下
      const token = getToken();
      localStorage.removeItem("token");

      const response = await fetch(api.auth.logout.url, {
        method: api.auth.logout.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      switch (response.status) {
        case 204:
          return {};
        case 401:
          // 在登出时，如果token过期了，我们也应该可以直接登出才对
          // 因为我们在前面已经删除了token
          // return { error: "Unauthorized: Missing token or inactive user." };
          return {};
        default:
          return { error: `Unknown error: ${String(response)}` };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: String(error) };
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-register
  async register(userCreate: UserCreate): Promise<{ error?: string }> {
    try {
      const response = await fetch(api.auth.register.url, {
        method: api.auth.register.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCreate),
      });

      const data = await response.json();
      switch (response.status) {
        case 201:
          return {};
        case 400:
          return { error: data.detail as string };
        case 422:
          return { error: "Validation Error" };
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: String(error) };
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-forgot-password
  async forgotPassword({
    email,
  }: {
    email: string;
  }): Promise<{ error?: string }> {
    try {
      const response = await fetch(api.auth.forgotPassword.url, {
        method: api.auth.forgotPassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      switch (response.status) {
        case 202:
          return {};
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: String(error) };
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-reset-password
  async resetPassword(
    token: string,
    password: string
  ): Promise<{ error?: string }> {
    try {
      const response = await fetch(api.auth.resetPassword.url, {
        method: api.auth.resetPassword.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, password: password }),
      });

      const data = await response.json();
      switch (response.status) {
        case 200:
          return {};
        case 400:
          return { error: data.detail as string };
        case 422:
          return { error: "Validation Error" };
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: String(error) };
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-request-verify-token
  async requestVerifyToken({
    email,
  }: {
    email: string;
  }): Promise<{ error?: string }> {
    try {
      const response = await fetch(api.auth.requestVerifyToken.url, {
        method: api.auth.requestVerifyToken.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      switch (response.status) {
        case 202:
          return {};
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: String(error) };
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-verify
  async verify({ token }: { token: string }): Promise<{ error?: string }> {
    try {
      const response = await fetch(api.auth.verify.url, {
        method: api.auth.verify.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
      });

      // console.log(await response.json());
      // 如果用户已经verify了，应该返回成功啊
      const data = await response.json();
      switch (response.status) {
        case 200:
          return {};
        case 400:
          if (data.detail === "VERIFY_USER_ALREADY_VERIFIED") {
            return {};
          }
          return { error: data.detail };
        case 422:
          return { error: "Validation Error" };
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: String(error) };
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#get-me
  async getUser(): Promise<{ user?: User; error?: string }> {
    try {
      const response = await fetch(api.user.me.url, {
        method: api.user.me.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();
      switch (response.status) {
        case 200:
          return { user: data as User };
        case 401:
          return { error: "Unauthorized" };
        default:
          return { error: `Unknown error: ${String(response)}` };
      }
    } catch (error) {
      console.error("Error:", error);
      return { error: String(error) };
    }
  }
}

export const authClient = new AuthClient();
