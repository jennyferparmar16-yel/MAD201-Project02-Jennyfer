// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Root layout using Stack navigation and global AppProvider.

import { Stack } from "expo-router";
import React from "react";
import { AppProvider } from "../src/context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="addTransaction" options={{ headerShown: true, title: "Add Transaction" }} />
        <Stack.Screen name="reports" options={{ headerShown: true, title: "Reports" }} />
      </Stack>
    </AppProvider>
  );
}
