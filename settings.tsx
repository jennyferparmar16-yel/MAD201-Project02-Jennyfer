// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Settings screen to toggle theme and choose currency with live API rate refresh.

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useApp } from "../../src/context/AppContext";
import { theme } from "../../src/theme/theme";

const CURRENCIES = ["USD", "CAD", "EUR", "GBP", "INR", "AUD"]; // Simple currency choices

export default function SettingsScreen() {
  const {
    themeName,
    setThemeName,
    baseCurrency,
    setBaseCurrency,
    displayCurrency,
    setDisplayCurrency,
    rate,
    refreshRate,
  } = useApp();

  const c = theme[themeName]; // Theme colors

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.h1, { color: c.text }]}>Settings</Text>

      <Text style={[styles.h2, { color: c.text }]}>Theme</Text>
      <View style={styles.row}>
        <TouchableOpacity
          onPress={() => setThemeName("light")}
          style={[styles.pill, { borderColor: c.border, backgroundColor: themeName === "light" ? c.card : "transparent" }]}
        >
          <Text style={{ color: c.text, fontWeight: "700" }}>Light</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setThemeName("dark")}
          style={[styles.pill, { borderColor: c.border, backgroundColor: themeName === "dark" ? c.card : "transparent" }]}
        >
          <Text style={{ color: c.text, fontWeight: "700" }}>Dark</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.h2, { color: c.text }]}>Currency</Text>

      <Text style={[styles.label, { color: c.text }]}>Base (API)</Text>
      <View style={styles.wrap}>
        {CURRENCIES.map((cur) => (
          <TouchableOpacity
            key={cur}
            onPress={() => setBaseCurrency(cur)}
            style={[styles.tag, { borderColor: c.border, backgroundColor: baseCurrency === cur ? c.card : "transparent" }]}
          >
            <Text style={{ color: c.text }}>{cur}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { color: c.text }]}>Display</Text>
      <View style={styles.wrap}>
        {CURRENCIES.map((cur) => (
          <TouchableOpacity
            key={cur}
            onPress={() => setDisplayCurrency(cur)}
            style={[styles.tag, { borderColor: c.border, backgroundColor: displayCurrency === cur ? c.card : "transparent" }]}
          >
            <Text style={{ color: c.text }}>{cur}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.rate, { color: c.text }]}>
        Rate: 1 {baseCurrency} = {rate.toFixed(4)} {displayCurrency}
      </Text>

      <TouchableOpacity style={[styles.btn, { backgroundColor: c.accent }]} onPress={refreshRate}>
        <Text style={styles.btnText}>Refresh Rate</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  h1: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  h2: { fontSize: 16, fontWeight: "800", marginTop: 10, marginBottom: 8 },
  label: { marginTop: 8, marginBottom: 6, fontWeight: "700" },
  row: { flexDirection: "row", gap: 10 },
  pill: { flex: 1, borderWidth: 1, padding: 12, borderRadius: 12, alignItems: "center" },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: { borderWidth: 1, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 12 },
  rate: { marginTop: 14, fontWeight: "700" },
  btn: { marginTop: 14, padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { color: "#ffffff", fontWeight: "800" },
});
