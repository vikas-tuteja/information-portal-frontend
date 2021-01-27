import { UserName } from './user';

export interface Comment {
  id: number;
  created_at: Date;
  text: string;
  user: UserName;
}

export interface Comments {
  results: Comment[];
  count: number;
  next: string;
  previous: string;
  total_likes: number;
  can_like: boolean;
}
