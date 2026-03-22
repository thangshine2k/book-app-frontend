"use client";

import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Button } from "@mui/material";
import { books } from "@/app/data/books";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";

const fetchBook = async (id: number) => {
  const book = books.find((b) => b.id === id);
  if (!book) throw new Error("Not found");
  return book;
};

export default function BookDetail() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const [isReading, setIsReading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const conanContent = `
Shinichi Kudo là một thám tử học sinh nổi tiếng...

Một ngày nọ, cậu bị hai kẻ áo đen tấn công và ép uống thuốc độc...

Khi tỉnh dậy, cơ thể cậu đã bị teo nhỏ thành một đứa trẻ!

Từ đó, cậu lấy tên là Conan Edogawa và bắt đầu hành trình phá án...
`;
  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBook(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error || !book) return <div>Not found</div>;
  if (isReading) {
    return (
      <Box p={5}>
        <Button onClick={() => setIsReading(false)}>← Quay lại</Button>

        <Typography variant="h4" fontWeight="bold" mt={2}>
          {book.title}
        </Typography>

        <Box
          mt={3}
          sx={{
            lineHeight: 1.8,
            maxHeight: "80vh",
            overflowY: "auto",
          }}
        >
          <Typography whiteSpace="pre-line">{conanContent}</Typography>
        </Box>
      </Box>
    );
  }
  return (
    <Box p={5}>
      <Button startIcon={<ArrowBackIcon />} onClick={() => router.back()}>
        Quay lại
      </Button>
      {/* Layout 2 cột */}
      <Box display="flex" gap={5} mt={1}>
        {/* LEFT: IMAGE */}
        <Box sx={{ position: "relative", width: 350, height: 500 }}>
          <Image
            src={`/img/conan_${book.id}.webp`}
            alt="book"
            fill
            style={{ objectFit: "cover", borderRadius: 12 }}
          />
        </Box>

        {/* RIGHT: INFO */}
        <Box flex={1}>
          <Typography variant="h5" fontWeight="bold">
            {book.title}
          </Typography>

          {/* rating fake */}
          <Typography mt={1}>⭐ 5.0 | 18 đánh giá</Typography>

          {/* price */}
          <Typography
            mt={2}
            sx={{ fontSize: 28, color: "red", fontWeight: "bold" }}
          >
            {book.price}.000đ
          </Typography>

          {/* shipping */}
          <Box mt={3}>
            <Typography>🚚 Nhận từ 19 Th03 - 20 Th03</Typography>
            <Typography color="green">Phí ship 0đ</Typography>
          </Box>

          {/* policy */}
          <Box mt={2}>
            <Typography>
              ✔ Trả hàng miễn phí 15 ngày • Chính hãng 100%
            </Typography>
          </Box>

          {/* quantity */}
          <Box mt={3} display="flex" alignItems="center" gap={2}>
            <Typography>Số lượng</Typography>

            <Box display="flex" alignItems="center" gap={1}>
              <Button variant="outlined" onClick={decrease}>
                -
              </Button>

              <Typography>{quantity}</Typography>

              <Button variant="outlined" onClick={increase}>
                +
              </Button>
            </Box>
          </Box>

          {/* buttons */}
          <Box mt={4} display="flex" gap={2}>
            <Button variant="outlined" color="error">
              Thêm vào giỏ hàng
            </Button>

            <Button variant="contained" color="error">
              Mua ngay
            </Button>
          </Box>
          <Box mt={4} display="flex" gap={2} onClick={() => setIsReading(true)}>
            <Button variant="contained" color="error">
              Đọc ngay tại đây
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
