export const path = {
  // home: "/home",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
  },
  agent: {
    home: "/agent",
    create: "/agent/create",
    chat: "/agent/chat",
  },
  index: "/home",
} as const;
