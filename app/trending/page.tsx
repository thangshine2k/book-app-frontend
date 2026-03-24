"use client";

import { Box, Typography, Paper } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Footer } from "../components/Footer";

type Book = {
  id: number;
  title: string;
  image: string;
  author: string;
  totalChapters: number;
};

export default function TrendingPage() {
  const router = useRouter();

  const { data = [], isLoading } = useQuery<Book[]>({
    queryKey: ["trending"],
    queryFn: async () => (await api.get("/stories")).data,
  });

  if (isLoading) return <div>Loading...</div>;

  const top1 = data[0];
  const topList = data.slice(1, 5);
  const gridList = data.slice(5);

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      sx={{
        overflowX: "hidden",
        boxSizing: "border-box",
        mt: 3,
      }}
    >
      <Box p={{ xs: 2, sm: 3, md: 4 }} mt={4} mx="auto">
        {/* ===== HERO TOP 1 ===== */}
        <Box display="flex" justifyContent="center">
          {top1 && (
            <Paper
              sx={{
                position: "relative",
                width: "100%",
                height: "100%",
                aspectRatio: "2/1",
                borderRadius: 4,
                overflow: "hidden",
                mx: "auto",
                cursor: "pointer",
                mb: 4,
                background: "#000",
              }}
              onClick={() => router.push(`/books/${top1.id}`)}
            >
              <Image
                src={top1.image}
                alt={top1.title}
                fill
                style={{ objectFit: "cover" }}
              />

              {/* overlay */}
              <Box
                sx={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
                  p: { xs: 1.5, sm: 2, md: 3 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  color: "#fff",
                  mx: "auto",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight="bold"
                  sx={{ fontSize: { xs: 16, sm: 18, md: 22 } }}
                >
                  {top1.title}
                </Typography>

                <Typography sx={{ fontSize: { xs: 12, sm: 14 } }}>
                  ✍ {top1.author} • 📖 {top1.totalChapters}
                </Typography>
              </Box>
            </Paper>
          )}
        </Box>

        {/* ===== TOP LIST (2-5) ===== */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 4,
            width: { xs: "92%", sm: "94%", md: "96%", lg: "96%" },
            minWidth: 0,
            boxSizing: "border-box",
          }}
        >
          {topList.map((book, index) => (
            <Paper
              key={book.id}
              sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: 3,
                cursor: "pointer",
                minWidth: 0,
                width: "100%",
                overflow: "hidden",
              }}
              onClick={() => router.push(`/books/${book.id}`)}
            >
              {/* IMAGE */}
              <Box
                sx={{
                  width: { xs: 70, sm: 80, md: 90 },
                  height: { xs: 70, sm: 80, md: 90 },
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  style={{ objectFit: "cover", borderRadius: 6 }}
                />
              </Box>

              {/* INFO */}
              <Box sx={{ minWidth: 0, flex: 1 }}>
                <Typography
                  fontWeight="bold"
                  sx={{ fontSize: { xs: 13, sm: 14 } }}
                >
                  #{index + 1} {book.title}
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  {book.totalChapters} chapters
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        <Typography variant="h5" fontWeight="bold" mb={2} color="white">
          📚 More Trending
        </Typography>

        {/* ===== GRID LIST ===== */}
        <Box
          display="grid"
          sx={{
            width: "100%",
            minWidth: 0,
          }}
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)", // 👈 giống BooksPage
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
          gap={{ xs: 1.5, sm: 2, md: 3 }}
        >
          {gridList.map((book) => (
            <Box
              key={book.id}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
              onClick={() => router.push(`/books/${book.id}`)}
            >
              {/* IMAGE */}
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "2/3", // ✅ thay paddingTop
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={book.image}
                  alt={book.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>

              {/* TEXT */}
              <Typography
                mt={1}
                color="white"
                fontWeight="bold"
                sx={{
                  fontSize: { xs: 12, sm: 14 },
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "2.8em",
                }}
              >
                {book.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      <Footer />
    </Box>
  );
}
