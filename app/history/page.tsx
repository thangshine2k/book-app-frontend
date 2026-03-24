"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Typography, CircularProgress } from "@mui/material";
import { Book } from "../types/books";
import BookCard from "../components/BookCard";

export default function HistoryPage() {
  const { data: history = [], isLoading } = useQuery<Book[]>({
    queryKey: ["history"],
    queryFn: async () => {
      // Lấy dữ liệu history từ API hoặc localStorage
      const h = localStorage.getItem("history");
      return h ? JSON.parse(h) : [];
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
        History
      </Typography>

      {history.length === 0 ? (
        <Typography>No history yet.</Typography>
      ) : (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {history.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Box>
      )}
    </Box>
  );
}