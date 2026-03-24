"use client";

import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  Divider,
  useMediaQuery,
  CardMedia,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DashboardIcon from "@mui/icons-material/Dashboard";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HistoryIcon from "@mui/icons-material/History";

import { useRouter, usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { Book } from "../types/books";
import { useQuery } from "@tanstack/react-query";
import { api } from "../service/api";
import Image from "next/image";

const menuMain = [
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "All Manga", icon: <MenuBookIcon />, path: "/books" },
  { label: "Trending", icon: <WhatshotIcon />, path: "/trending" },
];

const menuUser = [
  { label: "Favorites", icon: <FavoriteIcon />, path: "/favorites" },
  { label: "History", icon: <HistoryIcon />, path: "/history" },
];

const categories = ["Action", "Romance", "Comedy", "Fantasy", "Horror"];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");

  const { data: books = [] } = useQuery({
    queryKey: ["search-books"],
    queryFn: async () => (await api.get("/stories")).data,
  });

  const normalize = (str: string) =>
    str
      .toLowerCase()
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xoá dấu
      .replace(/đ/g, "d") // xử lý riêng tiếng Việt
      .replace(/[^a-z0-9]/g, ""); // xoá space + ký tự đặc biệt

  const results = useMemo(() => {
    if (!keyword.trim()) return [];

    const keywords = normalize(keyword).split("");

    return books
      .filter((b: Book) => {
        const title = normalize(b.title);
        return keywords.every((k) => title.includes(k));
      })
      .slice(0, 5);
  }, [keyword, books]);

  const renderMenu = (items: typeof menuMain) => (
    <List>
      {items.map((item) => {
        const isActive = pathname === item.path;

        return (
          <ListItem disablePadding key={item.label}>
            <ListItemButton
              onClick={() => {
                router.push(item.path);
                setOpen(false);
              }}
              sx={{
                mx: 1,
                mb: 0.5,
                borderRadius: 2,
                backgroundColor: isActive
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 36 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  const content = (
    <Box>
      {/* ===== LOGO ===== */}
      <Box px={2} py={2}>
        <Typography variant="h6" fontWeight="bold">
          📖 MangaApp
        </Typography>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

      {/* ===== MAIN ===== */}
      <Box px={1} mt={1}>
        <Typography variant="caption" sx={{ px: 1, color: "#aaa" }}>
          MAIN
        </Typography>
        {renderMenu(menuMain)}
      </Box>

      {/* ===== USER ===== */}
      <Box px={1} mt={2}>
        <Typography variant="caption" sx={{ px: 1, color: "#aaa" }}>
          PERSONAL
        </Typography>
        {renderMenu(menuUser)}
      </Box>

      {/* ===== CATEGORY ===== */}
      <Box px={1} mt={2}>
        <Typography
          variant="caption"
          sx={{
            px: 1,
            color: "#aaa",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <CategoryIcon fontSize="small" />
          CATEGORIES
        </Typography>

        <List>
          {categories.map((cat) => (
            <ListItem disablePadding key={cat}>
              <ListItemButton
                sx={{
                  mx: 1,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                <ListItemText primary={cat} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* ===== FOOTER ===== */}
      <Box mt={3} px={2}>
        <Typography variant="caption" color="#777">
          © 2026 MangaApp
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {/* ===== MOBILE TOP BAR ===== */}

      {isMobile && showSearch && (
        <Box
          sx={{
            position: "fixed",
            top: 56,
            left: 0,
            width: "100%",
            zIndex: 1400,
          }}
        >
          {/* overlay click to close */}
          <Box
            onClick={() => setShowSearch(false)}
            sx={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
            }}
          />

          {/* search box */}
          <Box
            sx={{
              position: "relative",
              background: "#1f1f1f",
              px: 2,
              py: 1,
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {/* INPUT */}
            <Box
              component="input"
              autoFocus
              placeholder="Search manga..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              style={{
                width: "94%",
                padding: "10px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
              }}
            />

            {/* RESULT */}
            {results.length > 0 && (
              <Box mt={1}>
                {results.map((item: Book) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 1,
                      borderRadius: 2,
                      cursor: "pointer",
                      "&:hover": {
                        background: "rgba(255,255,255,0.1)",
                      },
                    }}
                    onClick={() => {
                      router.push(`/books/${item.id}`);
                      setShowSearch(false);
                      setKeyword("");
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 50,
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{ objectFit: "cover", borderRadius: 4 }}
                      />
                    </Box>

                    <Typography fontSize={14} noWrap sx={{ color: "white" }}>
                      {item.title}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      )}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            background: "black",
            zIndex: 1300,
          }}
        >
          <IconButton onClick={() => setOpen((prev) => !prev)}>
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
          <CardMedia
            component="img"
            image="https://res.cloudinary.com/df0nepumo/image/upload/manga-1_djdd6g"
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              objectFit: "cover",
              cursor: "pointer",
            }}
            alt="logo"
            onClick={() => router.push("/")}
          />

          <IconButton onClick={() => setShowSearch((prev) => !prev)}>
            <SearchIcon sx={{ color: "#fff", mr: 3 }} />
          </IconButton>
        </Box>
      )}

      {/* ===== MOBILE DRAWER ===== */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: 260,
              background: "#1f1f1f",
              color: "#fff",
            },
          }}
        >
          {content}
        </Drawer>
      )}

      {/* ===== DESKTOP SIDEBAR ===== */}
      {!isMobile && (
        <Box
          sx={{
            width: 260,
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            background: "#1f1f1f",
            color: "#fff",
            overflowY: "auto",
          }}
        >
          {content}
        </Box>
      )}
    </>
  );
};
