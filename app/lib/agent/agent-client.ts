// 2024/6/21
// zhangzhong

import { api } from "@/app/lib/api";
import { getToken } from "@/app/lib/common/token";

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
          Authorization: `Bearer ${getToken()}`,
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

  async addKnowledges({
    agent_id,
    knowledge_ids,
  }: {
    agent_id: string;
    knowledge_ids: string[];
  }): Promise<{ error?: string }> {
    try {
      const response = await fetch(api.agent.addKnowledges.url, {
        method: api.agent.addKnowledges.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          agent_id,
          knowledge_ids,
        }),
      });

      switch (response.status) {
        case 200:
          return {};
        case 422:
          return { error: "Validation Error" };
        default:
          return { error: "Unknown error" };
      }
    } catch (error) {
      return { error: String(error) };
    }
  }

  async listAgents({
    limit,
  }: {
    limit: number;
  }): Promise<{ agents: Agent[]; error?: string }> {
    try {
      // Create the query string
      const queryString = `limit=${encodeURIComponent(limit)}`;
      // Append the query string to the base URL
      const urlWithParams = `${api.agent.listAgents.url}?${queryString}`;

      const response = await fetch(urlWithParams, {
        method: api.agent.listAgents.method,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const data = await response.json();
      switch (response.status) {
        case 200:
          return { agents: data as Agent[] };
        case 422:
          return { agents: [], error: "Validation Error" };
        default:
          return { agents: [], error: "Unknown error" };
      }
    } catch (error) {
      return { agents: [], error: String(error) };
    }
  }

  // TODO: 后端需要增加一个新的接口
  async getAgent({
    id,
  }: {
    id: string;
  }): Promise<{ agent?: Agent; error?: string }> {
    return {
      agent: {
        id: id,
        name: "fake-name",
        description: "fake-description",
      } as Agent,
    };
  }
}

export const agentClient = new AgentClient();
