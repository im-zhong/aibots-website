// 2024/7/5
// zhangzhong

export interface Message {
  // TODO, 1.应该是string
  // 2.这个message的类型肯定是不对啊
  // 我们应该返回
  // message为什么没有created_at呢？
  // 3. 每个message都必须有一个唯一的id呀！！
  sender: number;
  receiver: number;
  is_start_of_stream: boolean;
  is_end_of_stream: boolean;
  content: string;
}

export interface Chat {
  id: string;
  user_id: string;
  agent_id: string;
  create_at: string;
  chat_history: Message[];
}
