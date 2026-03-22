import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";
import { Book } from "../data/books";
import { useRouter } from "next/navigation";

export default function BookCard({ book }: { book: Book }) {
  const router = useRouter();
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        transition: "0.3s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <Box
        position="relative"
        onClick={() => {
          router.push(`/books/${book.id}`);
        }}
      >
        <CardMedia component="img" height="200" image={book.image} />

        {/* HOT badge */}
        {book.id < 3 && (
          <Box
            position="absolute"
            top={10}
            left={10}
            bgcolor="red"
            color="#fff"
            px={1}
            fontSize={12}
            borderRadius={1}
          >
            HOT
          </Box>
        )}
      </Box>

      <CardContent sx={{ p: 1 }}>
        <Typography
          fontSize={14}
          fontWeight="bold"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {book.title}
        </Typography>
      </CardContent>
    </Card>
  );
}
