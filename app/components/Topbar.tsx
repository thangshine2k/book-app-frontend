"use client";

import { Box, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function Topbar() {
  const cartCount = 1; // sau này lấy từ context

  return (
    <Box
      px={4}
      py={2}
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      sx={{
        borderBottom: "1px solid #eee",
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(10px)",
      }}
    >
      <Badge badgeContent={cartCount} color="primary">
        <ShoppingCartIcon sx={{ cursor: "pointer" }} />
      </Badge>
    </Box>
  );
}