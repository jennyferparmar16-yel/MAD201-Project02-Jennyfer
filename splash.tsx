// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Splash screen that shows title and navigates to tabs after a delay.

import { router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useApp } from "../src/context/AppContext";
import { theme } from "../src/theme/theme";

export default function SplashScreen() {
  const { themeName } = useApp();
  const c = theme[themeName]; // Current theme colors

  useEffect(() => {
    const t = setTimeout(() => router.replace("/(tabs)"), 1500); // Navigate after short delay
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.title, { color: c.text }]}>Smart Budget Tracker Lite</Text>
      <Text style={[styles.sub, { color: c.text }]}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
  },
  sub: {
    marginTop: 10,
    fontSize: 14,
    opacity: 0.8,
  },
});
