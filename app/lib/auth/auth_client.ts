// 2024/6/20
// zhangzhong
// 简单的说就是封装我们自己的/api/auth系列还有/api/user/* 系列的API

// 在这里定义User的类型

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

const API_URL = "http://172.23.252.251:8000";

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
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
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
          const credentials = data as Credentials;
          localStorage.setItem("token", credentials.access_token);
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
      const token = localStorage.getItem("token");
      if (token === null) {
        return { error: "No token" };
      }
      localStorage.removeItem("token");

      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      switch (response.status) {
        case 204:
          return {};
        case 401:
          return { error: "Unauthorized: Missing token or inactive user." };
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
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCreate),
        credentials: "include",
      });
      switch (response.status) {
        case 200:
          // return (await response.json()) as User;
          return {};
        case 422:
          return { error: "Validation Error" };
        case 400:
          return { error: "Bad Request" };
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
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
        credentials: "include",
      });
      switch (response.status) {
        case 204:
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
  async resetPassword(token: string, password: string) {
    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token, password: password }),
        credentials: "include",
      });
      switch (response.status) {
        case 200:
          return undefined;
        // case 401:
        //   return "Unauthorized";
        // case 422:
        //   return "Validation Error";
        default:
          return "Unknown error";
      }
    } catch (error) {
      console.error("Error:", error);
      return String(error);
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-request-verify-token
  async requestVerifyToken({ email }: { email: string }) {
    try {
      const response = await fetch(`${API_URL}/api/auth/request-verify-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
        credentials: "include",
      });
      switch (response.status) {
        case 202:
          return undefined;
        default:
          return "Unknown error";
      }
    } catch (error) {
      console.error("Error:", error);
      return String(error);
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-verify
  async verify({ token }: { token: string }): Promise<{ error?: string }> {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
        credentials: "include",
      });
      // console.log(await response.json());
      // 如果用户已经verify了，应该返回成功啊
      switch (response.status) {
        case 200:
          return {};
        case 400:
          const { detail } = await response.json();
          if (detail === "VERIFY_USER_ALREADY_VERIFIED") {
            return {};
          }
          return { error: detail };
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
      const token = localStorage.getItem("token");
      if (token === null) {
        return { error: "No token" };
      }

      const response = await fetch(`${API_URL}/api/user/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      switch (response.status) {
        case 200:
          return { user: data as User };
        case 400:
          return { error: data.detail as string };
        case 401:
          return { error: "Unauthorized" };
        case 422:
          return { error: "Validation Error" };
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
