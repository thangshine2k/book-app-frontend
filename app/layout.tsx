"use client";
import LayoutClient from "./LayoutClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#1f1f1f" }}>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}
