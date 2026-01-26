export interface ITestimonial {
  _id: string;
  name: string;
  title: string;
  content: string;
  rating: number;
  approved: boolean;
  images: { url: string; public_id: string }[];
  createdAt: string;
}