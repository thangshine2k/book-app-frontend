import { Box } from "@mui/material";

export default function FloatingCart({ count }: { count: number }) {
  return (
    <Box
      position="fixed"
      top={20}
      right={20}
      sx={{
        background: "white",
        borderRadius: "100%",
        boxShadow: 3,
        p: 2,
        cursor: "pointer",
      }}
    >
      🛒 {count}
    </Box>
  );
}