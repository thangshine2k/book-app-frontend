"use client";

import { Box, Typography, Divider } from "@mui/material";
import BookCard from "../components/BookCard";
import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api";
import { Book } from "../types/books";
import { Footer } from "../components/Footer";

export default function BooksPage() {
  const { data = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await api.get("/stories");
      return res.data;
    },
  });
  const hotBooks = data.slice(0, 5);
  if (isLoading) return <div>Loading...</div>;

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh" mt={3}>
      {/* MAIN */}
      <Box flex={1} mt={4} p={{ xs: 2, sm: 3, md: 4 }}>
        {/* 🔥 HOT */}
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)", // 👈 mobile 2 cột
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={{ xs: 1.5, sm: 2, md: 3 }}
        >
          {hotBooks.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* 📚 ALL */}
        <Typography variant="h5" fontWeight="bold" mb={2} color="white">
          📚 All Manga
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)", // 👈 mobile 2 cột
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={{ xs: 1.5, sm: 2, md: 3 }}
        >
          {data.map((book: Book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Box>
      </Box>

      {/* FOOTER */}
      <Footer />
    </Box>
  );
}
