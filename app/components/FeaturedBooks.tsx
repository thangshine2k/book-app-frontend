import { Box, Typography } from "@mui/material";
import { Book } from "../types/book";
import BookCard from "./BookCard";

export default function FeaturedBooks({
  books,
  addToCart,
}: {
  books: Book[];
  addToCart: (b: Book) => void;
}) {
  return (
    <>
      <Typography variant="h5" fontWeight="bold" mb={2}>
        ⭐ Featured Books
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(3, 1fr)" }}
        gap={3}
      >
        {books.slice(0, 3).map((book) => (
          <BookCard key={book.id} book={book} addToCart={addToCart} />
        ))}
      </Box>
    </>
  );
}