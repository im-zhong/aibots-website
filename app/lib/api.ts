// 我感觉我需要像path那样给api也整一个const

import { create } from "domain";
import { url } from "inspector";

// 因为还是挺多地方使用到了
const API_URL = "http://172.23.252.251:8000/api";
export const api = {
  auth: {
    // 讲道理 每个API还有一个方法呢, 要不要带着呢？
    // 感觉也不是很有必要
    // 但是带上了也挺好的
    // 还是带上吧
    login: {
      method: "POST",
      url: `${API_URL}/auth/login`,
    },
    logout: {
      method: "POST",
      url: `${API_URL}/auth/logout`,
    },
    register: {
      method: "POST",
      url: `${API_URL}/auth/register`,
    },
    forgotPassword: {
      method: "POST",
      url: `${API_URL}/auth/forgot-password`,
    },
    resetPassword: {
      method: "POST",
      url: `${API_URL}/auth/reset-password`,
    },
    requestVerifyToken: {
      method: "POST",
      url: `${API_URL}/auth/request-verify-token`,
    },
    verify: {
      method: "POST",
      url: `${API_URL}/auth/verify`,
    },
  },
  user: {
    me: {
      method: "GET",
      url: `${API_URL}/user/me`,
    },
    patch: {
      method: "PATCH",
      url: `${API_URL}/user/me`,
    },
  },

  agent: {
    create: {
      method: "POST",
      url: `${API_URL}/agent/create`,
    },
  },
};
