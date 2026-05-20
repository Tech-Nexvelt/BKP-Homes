export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  coverImage?: string;
  authorId: string;
  tags: string[];
  category?: string;
  isPublished: boolean;
  publishedAt?: string;
  readTime?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Portfolio {
  id: string;
  title: string;
  description?: string;
  images: string[];
  roomType?: string;
  projectType?: string;
  client?: string;
  location?: string;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
}
