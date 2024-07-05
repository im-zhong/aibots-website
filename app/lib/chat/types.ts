// 2024/7/5
// zhangzhong

export interface Message {
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
