// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Defines light and dark theme colors used by the UI.

export type ThemeName = "light" | "dark";

export const theme = {
  light: {
    background: "#ffffff",
    text: "#111111",
    card: "#f3f4f6",
    border: "#e5e7eb",
    income: "#16a34a",
    expense: "#dc2626",
    accent: "#2563eb",
  },
  dark: {
    background: "#0b1220",
    text: "#f8fafc",
    card: "#111a2e",
    border: "#23304f",
    income: "#22c55e",
    expense: "#ef4444",
    accent: "#60a5fa",
  },
} as const;
