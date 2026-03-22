"use client";

import { useState } from "react";
import { Box, Typography, TextField, Divider } from "@mui/material";
import BookCard from "../components/BookCard";
import { books } from "../data/books";

export default function BooksPage() {
  const [search, setSearch] = useState("");

  const hotBooks = books.slice(0, 5);

  const filtered = books.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      {/* MAIN */}
      <Box flex={1} p={{ xs: 2, sm: 3, md: 4 }}>
        {/* 🔥 HOT */}
        <Typography variant="h5" fontWeight="bold" mb={2}>
          🔥 Trending Manga
        </Typography>

        <Box
          display={{ xs: "block", sm: "flex", md: "flex" }}
          overflow="auto"
          gap={2}
          mb={4}
        >
          {hotBooks.map((book) => (
            <Box
              key={book.id}
              minWidth={{ xs: 140, sm: 180, md: 220 }}
              flexShrink={0}
            >
              <BookCard book={book} />
            </Box>
          ))}
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* 📚 ALL */}
        <Typography variant="h5" fontWeight="bold" mb={2}>
          📚 All Manga
        </Typography>

        <TextField
          placeholder="Search manga..."
          fullWidth
          size="small"
          sx={{ mb: 2 }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)", // 👈 mobile 2 cột
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={{ xs: 1.5, sm: 2, md: 3 }}
        >
          {filtered.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </Box>
      </Box>

      {/* FOOTER */}
      <Box
        bgcolor="#111827" // 👈 đổi màu ở đây
        color="#e5e7eb"
        px={{ xs: 2, md: 4 }}
        py={{ xs: 3, md: 5 }}
        mt={4}
      >
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
          }}
          gap={3}
        >
          {/* About */}
          <Box>
            <Typography variant="h6" mb={1}>
              📖 MangaStore
            </Typography>
            <Typography variant="body2">
              Your favorite place to read and buy manga online.
            </Typography>
          </Box>

          {/* Links */}
          <Box>
            <Typography variant="h6" mb={1}>
              Links
            </Typography>
            <Typography variant="body2">Home</Typography>
            <Typography variant="body2">Hot Manga</Typography>
            <Typography variant="body2">Categories</Typography>
          </Box>

          {/* Contact */}
          <Box>
            <Typography variant="h6" mb={1}>
              Contact
            </Typography>
            <Typography variant="body2">Email: manga@gmail.com</Typography>
            <Typography variant="body2">Phone: 09712184900</Typography>
          </Box>
        </Box>

        <Typography variant="body2" textAlign="center" mt={4}>
          © 2026 MangaStore. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
