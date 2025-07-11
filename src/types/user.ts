export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  location: string;
  interests: string[];
  verified: boolean;
  distance?: number;
  lastActive?: string;
  job?: string;
  education?: string;
  height?: string;
  pronouns?: string;
}

export interface Match {
  id: string;
  user: User;
  matchedAt: string;
  lastMessage?: Message;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  matchId: string;
  messages: Message[];
}

export interface EditableProfile {
  name: string;
  age: number;
  bio: string;
  location: string;
  interests: string[];
  job: string;
  education: string;
  height: string;
  pronouns: string;
}