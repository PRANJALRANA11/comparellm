import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";


export const metadata = {
  title: "llmpare",
  description: "get best out of llm",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.png" sizes="any" />
      <body className="dark" >{children}</body>
    </html>
  );
}
