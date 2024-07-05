// 2024/7/5
// zhangzhong

export interface Topic {
  topic: string;
  knowledgeId: string;
}

export interface KnowledgePoint {
  id: string;
  path: string;
  type: "file" | "url";
}
