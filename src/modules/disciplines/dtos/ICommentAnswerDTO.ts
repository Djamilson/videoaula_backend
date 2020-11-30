interface IUser {
  id: string;
  name: string;
  avatar_url?: string | null;
}

export default interface ICommentAnswerDTO {
  id: string;
  comment_answer: string;
  comment_id: string;
  created_at: Date;
  user: IUser;
}
