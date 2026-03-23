export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  image: string;
  chapters: Chapter[];
};
export type Chapter = {
  id: number;
  storyId: number;
  chapterNumber: number;
  title: string;
  contentUrl: string;
  story: Book;
};

export type Story = {
  id: number;
  title: string;
  author?: string;
  totalChapters: number;
  price: number;
};
