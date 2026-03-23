"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { api } from "@/app/service/api";
import { useState } from "react";
import { Chapter } from "@/app/types/books";

export default function BookDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [value, setValue] = useState<string>("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await api.get(`/stories/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!book) return <div>Not found</div>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f5f5f5",
        py: 4,
      }}
    >
      {/* BACK */}
      <Box px={2}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()}>
          Quay lại
        </Button>
      </Box>

      {/* HEADER */}
      <Box textAlign="center" px={2} mt={2}>
        <Typography variant="h5" fontWeight="bold" color="#2c7be5">
          {book.title}
        </Typography>

        <Typography mt={1} fontSize={18}>
          {book.title}
        </Typography>

        <Typography mt={2}>
          Tác giả: <b>{book.author || "Đang cập nhật"}</b>
        </Typography>

        <Typography>
          Thể loại: <span style={{ color: "#2c7be5" }}>Truyện</span>
        </Typography>

        {/* BUTTONS */}
        <Stack direction="row" justifyContent="center" gap={2} mt={2}>
          <Select
            value={value}
            displayEmpty
            onChange={handleChange}
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="">
              <em>Chọn chương</em>
            </MenuItem>

            {book?.chapters?.map((chap: Chapter) => (
              <MenuItem key={chap.id} value={chap.id}>
                {chap.title}
              </MenuItem>
            ))}
          </Select>

          <Button variant="contained" color="inherit">
            →
          </Button>
        </Stack>
      </Box>

      {/* CONTENT */}
      <Box mt={4} display="flex" justifyContent="center">
        <Paper
          sx={{
            maxWidth: 700,
            width: "100%",
            p: 3,
            lineHeight: 1.8,
            background: "#fafafa",
            borderRadius: 2,
          }}
        >
          <Typography fontStyle="italic" mb={2}>
            *Chương này có nội dung ảnh, nếu bạn không thấy nội dung chương, vui
            lòng bật chế độ hiển thị hình ảnh của trình duyệt để đọc.
          </Typography>

          <Typography whiteSpace="pre-line">
            {book.description || "Chưa có nội dung..."}
          </Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          mt: 6,
          background: "#f3f4f6",
          px: { xs: 2, md: 6 },
          py: { xs: 4, md: 6 },
        }}
      >
        <Box
          display="grid"
          gridTemplateColumns={{
            xs: "1fr",
            sm: "repeat(2,1fr)",
            md: "repeat(3,1fr)",
          }}
          gap={4}
        >
          {/* Danh mục */}
          <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Danh mục
            </Typography>

            {[
              "Văn học Việt Nam",
              "Văn học nước ngoài",
              "Lịch sử",
              "Truyện cười hay",
              "Chuyện kể cho bé",
              "Giải thích Thành ngữ - Tục ngữ",
              "Kho tàng truyện cổ tích Việt Nam",
            ].map((item) => (
              <Typography
                key={item}
                sx={{
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": { color: "#1976d2" },
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>

          {/* Giới thiệu */}
          <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              MangaStore
            </Typography>

            <Typography variant="body2">
              Nền tảng đọc truyện online miễn phí, cập nhật nhanh nhất.
            </Typography>
          </Box>

          {/* Liên hệ */}
          <Box>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Liên hệ
            </Typography>

            <Typography>Email: manga@gmail.com</Typography>
            <Typography>Hotline: 0123456789</Typography>
          </Box>
        </Box>

        {/* ===== COPYRIGHT ===== */}
        <Box mt={5} pt={3} borderTop="1px solid #ddd" textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © 2026 MangaStore. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
