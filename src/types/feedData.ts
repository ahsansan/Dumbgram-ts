export default interface FeedData {
  id: number;
  fileName: string;
  caption: string;
  createdAt: string;
  user: {
    id: number | null;
    fullName: string;
    username: string;
    image: string;
    createdAt: string;
  };
  likers: any[];
}
