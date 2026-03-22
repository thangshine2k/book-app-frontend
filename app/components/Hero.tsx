"use client";

import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();

  return (
    <Box
      p={4}
      mb={4}
      sx={{
        borderRadius: 4,
        background: "linear-gradient(135deg, #1976d2, #42a5f5)",
        color: "white",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={1}>
        📚 Welcome back!
      </Typography>

      <Typography mb={2}>
        Discover your next favorite book today 🚀
      </Typography>

      <Button
        variant="contained"
        color="secondary"
        onClick={() => router.push("/books")}
      >
        Explore Books
      </Button>
    </Box>
  );
}