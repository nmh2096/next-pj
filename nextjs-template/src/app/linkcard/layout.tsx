"use client"
import  MainLayout  from "@/layouts/MainLayout";
import React from "react";

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}