// 2024/6/21
// zhangzhong

import { api } from "@/app/lib/api";

// https://www.startups.com/community/questions/561/should-our-photo-sharing-app-use-base64-strings-or-files-using-urls-to-display
export interface Agent {
  id: string;
  name: string;
  description: string;
  // TODO: 暂时不考虑头像
  // avatar: string;
}

export interface AgentCreate {
  user_id: string;
  name: string;
  description: string;
  is_shared: boolean;
  knowledges: string[];
  prompt: string;
  web_search: boolean;
  painting: boolean;
  multi_model: boolean;
}

// 好像这个类不export 我们也可以在下面创建一个实例
// 然后别的模块可以通过那个实例访问到类的成员
class AgentClient {
  async createAgent(
    agentCreate: AgentCreate
  ): Promise<{ agent?: Agent; error?: string }> {
    try {
      const response = await fetch(api.agent.create.url, {
        method: api.agent.create.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...agentCreate,
        }),
      });
      const data = await response.json();
      console.log(data);

      switch (response.status) {
        case 200:
          return { agent: data as Agent };
        case 422:
          return { error: "Validation Error" };
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      return { error: String(error) };
    }
  }
}

export const agentClient = new AgentClient();
