import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chhoti Si Chhutti | Shweta Ke Liye",
  description: "Krishna ke cute moods ke saath Shweta ke liye ek Goa invitation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
