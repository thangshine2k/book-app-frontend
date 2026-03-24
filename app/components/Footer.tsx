import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        bgcolor: "#111827",
        color: "#e5e7eb",
        px: { xs: 2, md: 4 },
        py: { xs: 3, md: 5 },
        mt: "auto",
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2,1fr)",
          md: "repeat(3,1fr)",
        }}
        gap={3}
      >
        {/* About */}
        <Box>
          <Typography variant="h6" mb={1}>
            📖 MangaStore
          </Typography>
          <Typography variant="body2">
            Your favorite place to read and buy manga online.
          </Typography>
        </Box>

        {/* Links */}
        <Box>
          <Typography variant="h6" mb={1}>
            Links
          </Typography>
          <Typography
            variant="body2"
            onClick={() => router.push("/")}
            sx={{ cursor: "pointer" }}
          >
            Home
          </Typography>
          <Typography
            variant="body2"
            onClick={() => router.push("/trending")}
            sx={{ cursor: "pointer" }}
          >
            Hot Manga
          </Typography>
          <Typography variant="body2">Categories</Typography>
        </Box>

        {/* Contact */}
        <Box>
          <Typography variant="h6" mb={1}>
            Contact
          </Typography>
          <Typography variant="body2">Email: manga@gmail.com</Typography>
          <Typography variant="body2">Phone: 09712184900</Typography>
        </Box>
      </Box>

      <Typography variant="body2" textAlign="center" mt={2}>
        © 2026 MangaStore. All rights reserved.
      </Typography>
    </Box>
  );
};
