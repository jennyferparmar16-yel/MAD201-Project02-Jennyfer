// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Home dashboard showing totals and navigation buttons.

import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SummaryCard from "../../src/components/SummaryCard";
import { useApp } from "../../src/context/AppContext";
import { theme } from "../../src/theme/theme";
import { getTotals } from "../../src/utils/calculations";

export default function HomeScreen() {
  const { transactions, themeName, displayCurrency, rate } = useApp();
  const c = theme[themeName]; // Theme colors

  const { income, expenses, balance } = getTotals(transactions); // Compute totals
  const incomeC = income * rate; // Convert totals to display currency
  const expensesC = expenses * rate;
  const balanceC = balance * rate;

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.h1, { color: c.text }]}>Dashboard</Text>

      <View style={styles.row}>
        <SummaryCard label="Income" value={`${displayCurrency} ${incomeC.toFixed(2)}`} borderColor={c.income} />
        <SummaryCard label="Expenses" value={`${displayCurrency} ${expensesC.toFixed(2)}`} borderColor={c.expense} />
      </View>

      <View style={styles.row}>
        <SummaryCard label="Balance" value={`${displayCurrency} ${balanceC.toFixed(2)}`} borderColor={c.accent} />
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: c.accent }]} onPress={() => router.push("/addTransaction")}>
        <Text style={styles.btnText}>Add Transaction</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btnOutline, { borderColor: c.border }]} onPress={() => router.push("/(tabs)/transactions")}>
        <Text style={[styles.btnOutlineText, { color: c.text }]}>View Transactions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btnOutline, { borderColor: c.border }]} onPress={() => router.push("/reports")}>
        <Text style={[styles.btnOutlineText, { color: c.text }]}>Reports</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  h1: { fontSize: 22, fontWeight: "800", marginBottom: 12 },
  row: { flexDirection: "row", gap: 8, marginBottom: 10 },
  btn: { marginTop: 14, padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { color: "#ffffff", fontWeight: "800" },
  btnOutline: { marginTop: 10, padding: 14, borderRadius: 12, borderWidth: 1, alignItems: "center" },
  btnOutlineText: { fontWeight: "700" },
});
