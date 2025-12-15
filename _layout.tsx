// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Bottom tabs navigation for Home, Transactions, and Settings.

import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="transactions" options={{ title: "Transactions" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      <Tabs.Screen name="explore" options={{ href: null }} /> 
    </Tabs>
  );
}
