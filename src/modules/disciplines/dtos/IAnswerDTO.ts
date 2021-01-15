export default interface IAnswerDTO {
  id?: string;
  comment_answer?: string;
  created_at?: Date;
  user: {
    id?: string;
    name?: string;
    avatar_url?: string | null;
  };
}
