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
  const { data } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => (await api.get("/stories")).data,
    select: (data) => ({
      books: data,
      stories: data.map((item: Story) => ({
        id: item.id,
        title: item.title,
        author: item.author,
        price: item.price,
      })),
    }),
  });
  const { stories = [], books = [] } = data || {};
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setMounted(true);
  }, []);

  const totalStories = stories.length;

  const totalAuthors = new Set(
    stories.map((s: Story) => s.author).filter(Boolean),
  ).size;

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
        mt: { xs: 3, sm: 0, md: 0, lg: 1 },
      }}
    >
      {/* ===== Header ===== */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "transparent",
          color: "#000",
          mt: { xs: 4, sm: 0, md: 0, lg: 0 },
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "flex-end",
            mr: { xs: 0, sm: 0, md: 0, lg: 3 },
          }}
        >
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
