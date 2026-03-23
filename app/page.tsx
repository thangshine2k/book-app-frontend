/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Box, CircularProgress } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true); // state để chờ check token
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check token từ localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setIsChecking(false);
    
  }, []);

  useEffect(() => {
    if (isChecking) return;
    if (isLoggedIn && pathname !== "/dashboard") {
      router.replace("/dashboard");
    } else if (!isLoggedIn && pathname !== "/login") {
      router.replace("/login");
    }
  }, [isChecking, isLoggedIn, pathname, router]);

  if (isChecking) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return null;
}