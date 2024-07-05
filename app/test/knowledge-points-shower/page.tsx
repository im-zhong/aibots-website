// 2024/7/5
// zhangzhong

import { KnowledgePointsShower } from "@/app/ui/agent/create/knowledge-points-shower";
import { KnowledgePoint } from "@/app/lib/agent/types";

export default function Page() {
  // 我们自己组织一些测试用例
  const knowledgePoints = [
    {
      id: "1",
      type: "file",
      path: "file1.pdf",
    } as KnowledgePoint,
    {
      id: "2",
      type: "url",
      path: "www.something.com",
    } as KnowledgePoint,
  ];

  return <KnowledgePointsShower knowledgePoints={knowledgePoints} />;
}
