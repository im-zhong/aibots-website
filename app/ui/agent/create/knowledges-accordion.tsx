import { KnowledgePanel } from "./knowledge-panel";
import { Topic } from "@/app/lib/agent/types";

export function KnowledgesAccordion({ topics }: { topics: Topic[] }) {
  return (
    <div>
      {topics.map((topic) => (
        <KnowledgePanel key={topic.knowledgeId} topic={topic} />
      ))}
    </div>
  );
}
