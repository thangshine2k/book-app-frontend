"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../service/api";
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

type Story = {
  id?: number;
  title: string;
  slug: string;
  author: string;
  price: number;
  image: string;
  description: string;
};

export default function StoryAdmin() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Story | null>(null);

  const [form, setForm] = useState<Story>({
    title: "",
    slug: "",
    author: "",
    price: 0,
    image: "",
    description: "",
  });

  // ===== GET LIST =====
  const { data = [], isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await api.get("/stories");
      return res.data;
    },
  });

  // ===== CREATE / UPDATE =====
  const mutationSave = useMutation({
    mutationFn: async (data: Story) => {
      if (editing) {
        return api.put(`/stories/${editing.id}`, data);
      }
      return api.post("/stories", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      setOpen(false);
      setEditing(null);
      resetForm();
    },
  });

  // ===== DELETE =====
  const mutationDelete = useMutation({
    mutationFn: (id: number) => api.delete(`/stories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  const resetForm = () => {
    setForm({
      title: "",
      slug: "",
      author: "",
      price: 0,
      image: "",
      description: "",
    });
  };

  const handleOpenCreate = () => {
    resetForm();
    setEditing(null);
    setOpen(true);
  };

  const handleEdit = (story: Story) => {
    setEditing(story);
    setForm(story);
    setOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box p={4} mt={4}>
      <Typography variant="h6" mb={3} fontWeight="bold" whiteSpace={"nowrap"}>
        Story Management
      </Typography>

      <Button variant="contained" onClick={handleOpenCreate}>
        + Create Story
      </Button>

      {/* LIST */}
      <Box mt={3} display="grid" gap={2} sx={{ background: "#ffffff" }}>
        {data.map((s: Story) => (
          <Box
            key={s.id}
            p={2}
            sx={{
              border: "1px solid #ccc",
              borderRadius: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography fontWeight="bold">{s.title}</Typography>
              <Typography>{s.author}</Typography>
              <Typography color="red">{s.price}.000đ</Typography>
            </Box>

            <Box display="flex" gap={1}>
              <Button onClick={() => handleEdit(s)}>Edit</Button>
              <Button
                color="error"
                onClick={() => mutationDelete.mutate(s.id!)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      {/* DIALOG FORM */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>{editing ? "Update Story" : "Create Story"}</DialogTitle>

        <DialogContent sx={{ display: "grid", gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <TextField
            label="slug"
            value={form.slug}
            onChange={(e) => setForm({ ...form, slug: e.target.value })}
          />
          <TextField
            label="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />

          <TextField
            label="Price"
            type="number"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: Number(e.target.value) })
            }
          />

          <TextField
            label="Image URL"
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={() => mutationSave.mutate(form)}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
