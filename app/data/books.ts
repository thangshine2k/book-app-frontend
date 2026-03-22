export type Book = {
  id: number;
  title: string;
  author: string;
  price: number;
  description: string;
  image: string;
};

export const books: Book[] = [
  { id: 1, image: "/public/conan1.jpg", title: "Truyện tranh Conan - Tập 1", author: "NXB Kim Đồng", price: 10, description: "Truyện tranh Conan - Tập 1" },
  { id: 2, image: "/public/conan2.jpg", title: "Truyện tranh Conan - Tập 2", author: "NXB Kim Đồng", price: 12, description: "Truyện tranh Conan - Tập 2" },
  { id: 3, image: "/public/conan3.jpg",title: "Truyện tranh Conan - Tập 3", author: "NXB Kim Đồng", price: 15, description: "Truyện tranh Conan - Tập 3" },
];