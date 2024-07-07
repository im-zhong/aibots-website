// 2024/7/5
// zhangzhong

import { Stack, Typography, Divider } from "@mui/material";

import { Topic } from "@/app/lib/agent/types";
import { AddTopicForm } from "./add-topic-form";
import { KnowledgesAccordion } from "./knowledges-accordion";
import theme from "@/app/ui/theme";

// 像这样把setState函数传进来也挺常见的
// 而且说实话也挺合理的
// 因为我们添加了一个知识topic 就需要重绘一次
// 否则我们怎么将数据传递上去呢 只有这一种方式啊
// TODO
export function KnowledgeForm({
  topics,
  setTopics,
}: {
  topics: Topic[];
  setTopics: React.Dispatch<React.SetStateAction<Topic[]>>;
}) {
  return (
    <Stack direction="column" alignItems="center" spacing={2}>
      <Typography variant="h4" fontWeight="bold">
        Knowledges
      </Typography>

      <Typography variant="body2" color={theme.palette.grey[500]}>
        Add knowledges for your agent. It could be a file or a website url. When
        you ask questions about such topics, knowledge will be used.
      </Typography>

      <Divider
        orientation="horizontal"
        flexItem
        sx={{ borderColor: "primary.main" }}
      />

      <AddTopicForm setTopics={setTopics} />

      <KnowledgesAccordion topics={topics} />
    </Stack>
  );
}
