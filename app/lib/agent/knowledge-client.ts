// 2024/6/21
// zhangzhong

import { api } from "@/app/lib/api";
import { getToken } from "@/app/lib/common/token";

export class KnowledgeClient {
  async createTopic({
    topic,
  }: {
    topic: string;
  }): Promise<{ id?: string; error?: string }> {
    try {
      const response = await fetch(api.knowledge.createTopic.url, {
        method: api.knowledge.createTopic.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          topic: topic,
        }),
      });

      const data = await response.json();
      switch (response.status) {
        case 200:
          return { id: data as string };
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

  async uploadFile({
    knowledge_id,
    file,
  }: {
    knowledge_id: string;
    file: File;
  }): Promise<{ id?: string; error?: string }> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("knowledge_id", knowledge_id);
      const response = await fetch(api.knowledge.uploadFile.url, {
        method: api.knowledge.uploadFile.method,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
        body: formData,
      });

      const data = await response.json();
      switch (response.status) {
        case 200:
          return { id: data as string };
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

  async uploadUrl({
    knowledge_id,
    url,
  }: {
    knowledge_id: string;
    url: string;
  }): Promise<{ id?: string; error?: string }> {
    try {
      const response = await fetch(api.knowledge.uploadUrl.url, {
        method: api.knowledge.uploadUrl.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          knowledge_id: knowledge_id,
          url: url,
        }),
      });

      const data = await response.json();
      switch (response.status) {
        case 200:
          return { id: data as string };
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
}

export const knowledgeClient = new KnowledgeClient();
