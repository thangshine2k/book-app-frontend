/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { Book, Story } from "../types/books";
import { Footer } from "../components/Footer";
import BookCard from "../components/BookCard";

export default function Dashboard() {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { data: books = [] } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await api.get("/stories");
      return res.data;
    },
  });
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setMounted(true);
  }, []);

  const { data: stories = [] } = useQuery<Story[]>({
    queryKey: ["stories"],
    queryFn: async () => (await api.get("/stories")).data,
  });
  const totalStories = stories.length;

  const totalAuthors = new Set(stories.map((s) => s.author).filter(Boolean))
    .size;

  const totalChapters = stories.reduce(
    (sum, s) => sum + (s.totalChapters || 0),
    0,
  );

  const avgPrice =
    stories.length > 0
      ? Math.round(
          stories.reduce((sum, s) => sum + (s.price || 0), 0) / stories.length,
        )
      : 0;
  // ===== Logout =====
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/");
  };

  // ===== Auth check =====
  if (!mounted || !token) {
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        mt: 3,
      }}
    >
      {/* ===== Header ===== */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ background: "transparent", color: "#000", mt: 4 }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            onClick={handleLogout}
            sx={{
              color: "#fff",
              background: "#ef4444",
              textTransform: "none",
              fontWeight: 500,
              borderRadius: 2,
              px: 2,
              "&:hover": {
                background: "#dc2626",
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* ===== Content ===== */}
      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexWrap: "wrap",
          px: { xs: 2, sm: 6 },
          py: { xs: 0, sm: 1 },
        }}
      >
        {/* Tổng truyện */}
        <Card
          sx={{
            flex: "1 1 250px",
            borderRadius: 4,
            background: "#E3F2FD",
          }}
        >
          <CardContent>
            <Typography color="text.secondary">Stories 📚</Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalStories}
            </Typography>
          </CardContent>
        </Card>

        {/* Tác giả */}
        <Card
          sx={{
            flex: "1 1 250px",
            borderRadius: 4,
            background: "#FFF3E0",
          }}
        >
          <CardContent>
            <Typography color="text.secondary">Authors ✍️</Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalAuthors}
            </Typography>
          </CardContent>
        </Card>

        {/* Chapters */}
        <Card
          sx={{
            flex: "1 1 250px",
            borderRadius: 4,
            background: "#E8F5E9",
          }}
        >
          <CardContent>
            <Typography color="text.secondary">Chapters 📖</Typography>
            <Typography variant="h4" fontWeight="bold">
              {totalChapters}
            </Typography>
          </CardContent>
        </Card>

        {/* Giá trung bình */}
        <Card
          sx={{
            flex: "1 1 250px",
            borderRadius: 4,
            background: "#F3E5F5",
          }}
        >
          <CardContent>
            <Typography color="text.secondary">Avg Price 💰</Typography>
            <Typography variant="h4" fontWeight="bold">
              {avgPrice}k
            </Typography>
          </CardContent>
        </Card>

        {/* Tổng truyện */}
        <Card
          sx={{
            flex: "1 1 250px",
            borderRadius: 4,
            background: "#FFECB3",
          }}
        >
          <CardContent>
            <Typography color="text.secondary">Total Revenue 💰</Typography>
            <Typography variant="h4" fontWeight="bold">
              {avgPrice * totalStories}k
            </Typography>
          </CardContent>
        </Card>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)", // 👈 mobile 2 cột
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={{ xs: 1.5, sm: 2, md: 3 }}
        >
          {books.map((book: Book) => (
            <Box key={book.id}>
              <BookCard book={book} />
            </Box>
          ))}
        </Box>
      </Box>
      {/* FOOTER */}
      <Footer />
    </Box>
  );
}
