"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Book } from "../types/books";
import BookCard from "../components/BookCard";

export default function FavoritesPage() {
  // Lấy danh sách favorite từ API hoặc localStorage
  const { data: favorites = [], isLoading } = useQuery<Book[]>({
    queryKey: ["favorites"],
    queryFn: async () => {
      // Thay bằng API gọi favorites nếu có, tạm dùng localStorage
      const fav = localStorage.getItem("favorites");
      return fav ? JSON.parse(fav) : [];
    },
  });

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ px: 2, py: 3 }}>
      <Typography variant="h4" mb={3}>
        Favorites
      </Typography>

      {favorites.length === 0 ? (
        <Typography>No favorites yet.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {favorites.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Box>
      )}
    </Box>
  );
}