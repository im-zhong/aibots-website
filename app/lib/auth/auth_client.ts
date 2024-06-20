// 2024/6/20
// zhangzhong
// 简单的说就是封装我们自己的/api/auth系列还有/api/user/* 系列的API

// 在这里定义User的类型

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

const API_URL = "http://localhost:8000";

export class AuthClient {
  // 登录成功之后，浏览器会保存一个cookie
  // 但是我们也可能登录失败呀
  // 所以方法需要返回一个bool值，和error
  // 这样调用方可以知道成功，失败的原因/
  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-login
  // https://fastapi-users.github.io/fastapi-users/latest/configuration/authentication/transports/cookie/#login
  async login(username: string, password: string): Promise<string | undefined> {
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
        credentials: "include",
      });

      // first check the response status code
      if (response.status === 204) {
        return undefined;
      }
      const json = await response.json();
      console.log(json);
      // get the detial error message
      return json.detail as string;
    } catch (error) {
      console.error("Error:", error);
      return String(error);
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-logout
  // https://fastapi-users.github.io/fastapi-users/latest/configuration/authentication/transports/cookie/#logout
  async logout(): Promise<string | undefined> {
    try {
      const response = await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      switch (response.status) {
        case 204:
          return undefined;
        case 401:
          return "Unauthorized";
        default:
          return "Unknown error";
      }
      // const json = await response.json();
      // return json.detail as string;
    } catch (error) {
      console.error("Error:", error);
      return String(error);
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-register
  async register(userCreate: UserCreate): Promise<User | string> {
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
          return (await response.json()) as User;
        case 422:
          return "Validation Error";
        case 400:
          return "Bad Request";
        default:
          return "Unknown error";
      }
    } catch (error) {
      console.error("Error:", error);
      return String(error);
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#post-forgot-password
  async forgotPassword(email: string): Promise<string | undefined> {
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
          return undefined;
        default:
          return "Unknown error";
      }
    } catch (error) {
      console.error("Error:", error);
      return String(error);
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
  async requestVerifyToken(email: string) {
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
  async verify(token: string) {
    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: token }),
        credentials: "include",
      });
      switch (response.status) {
        case 200:
          return undefined;
        default:
          return "Unknown error";
      }
    } catch (error) {
      console.error("Error:", error);
      return String(error);
    }
  }

  // https://fastapi-users.github.io/fastapi-users/latest/usage/routes/#get-me
  async getUser(): Promise<User | string> {
    try {
      const response = await fetch(`${API_URL}/api/user/me`, {
        method: "GET",
        credentials: "include",
      });
      switch (response.status) {
        case 200:
          return (await response.json()) as User;
        case 401:
          return "Unauthorized";
        default:
          return "Unknown error";
      }
    } catch (error) {
      console.error("Error:", error);
      return String(error);
    }
  }
}
