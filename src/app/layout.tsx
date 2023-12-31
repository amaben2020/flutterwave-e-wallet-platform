"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "./context/userContext";
import "./globals.css";
import { Roboto_Condensed, Inter, Ubuntu_Mono } from "next/font/google";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <ToastContainer position="top-center" />
      <UserContext>
        <body>{children}</body>
      </UserContext>
    </html>
  );
}
