export default interface CommentData {
  id: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    fullName: string;
    username: string;
    image: string;
  };
}
