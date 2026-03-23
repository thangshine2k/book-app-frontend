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
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box p={{ xs: 2, md: 4 }} mt={4}>
        {/* ===== HERO TOP 1 ===== */}
        {top1 && (
          <Paper
            sx={{
              position: "relative",
              height: { xs: 200, md: 300 },
              borderRadius: 4,
              overflow: "hidden",
              cursor: "pointer",
              mb: 4,
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
                p: 3,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                color: "#fff",
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                {top1.title}
              </Typography>
              <Typography variant="body2">
                ✍ {top1.author} • 📖 {top1.totalChapters} chapters
              </Typography>
            </Box>
          </Paper>
        )}

        {/* ===== TOP LIST (2-5) ===== */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr", // mobile 1 cột
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 2,
            mb: 4,
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
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 3,
                },
              }}
              onClick={() => router.push(`/books/${book.id}`)}
            >
              {/* IMAGE */}
              <Box
                sx={{
                  width: 60,
                  height: 80,
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
              <Box>
                <Typography fontWeight="bold" noWrap>
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

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(1,1fr)",
            sm: "repeat(3,1fr)",
            md: "repeat(5,1fr)",
          }}
          gap={2}
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
                  paddingTop: "140%",
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
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  minHeight: "3em",
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
