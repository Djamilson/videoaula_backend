interface IUser {
  id: string;
  name: string;
  avatar_url?: string | null;
}

interface ICommentAnswer {
  id: string;
  comment_answer: string;
  created_at: Date;
  user: IUser;
}

export default interface IListCommentDTO {
  id: string;
  comment: string;
  movie_id: string;
  created_at: Date;
  user: IUser;
  comment_answers: ICommentAnswer[];
}
