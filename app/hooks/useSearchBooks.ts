import { useMemo } from "react";
import { Book } from "../types/books";

const normalize = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]/g, "");

export const useSearchBooks = (books: Book[], keyword: string) => {
  return useMemo(() => {
    if (!keyword.trim()) return [];

    const key = normalize(keyword);

    return books.filter((b) => normalize(b.title).includes(key)).slice(0, 5);
  }, [books, keyword]);
};
