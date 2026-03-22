import { Box, Typography } from "@mui/material";

export default function Stats({
  totalBooks,
  cartCount,
}: {
  totalBooks: number;
  cartCount: number;
}) {
  return (
    <Box display="flex" gap={3} mb={4}>
      <Box p={3} flex={1} sx={{ background: "white", borderRadius: 3 }}>
        <Typography variant="h6">📚 Books</Typography>
        <Typography fontSize={24} fontWeight="bold">
          {totalBooks}
        </Typography>
      </Box>

      <Box p={3} flex={1} sx={{ background: "white", borderRadius: 3 }}>
        <Typography variant="h6">🛒 Cart</Typography>
        <Typography fontSize={24} fontWeight="bold">
          {cartCount}
        </Typography>
      </Box>

      <Box p={3} flex={1} sx={{ background: "white", borderRadius: 3 }}>
        <Typography variant="h6">📦 Orders</Typography>
        <Typography fontSize={24} fontWeight="bold">
          12
        </Typography>
      </Box>
    </Box>
  );
}