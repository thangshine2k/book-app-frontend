"use client";

import { Box, Button, Avatar } from "@mui/material";

export default function Header() {
  const isLoggedIn = false; // sau này thay bằng auth thật

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
      {isLoggedIn ? (
        <>
          <Avatar sx={{ mr: 2 }}>T</Avatar>
          <Button variant="outlined">Logout</Button>
        </>
      ) : (
        <>
          <Button sx={{ mr: 2 }}>Login</Button>
          <Button variant="contained">Register</Button>
        </>
      )}
    </Box>
  );
}