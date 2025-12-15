// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Text-based summary report by category and type using ScrollView and Text only.

import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useApp } from "../src/context/AppContext";
import { theme } from "../src/theme/theme";
import { getCategorySummary, getTotals } from "../src/utils/calculations";

export default function ReportsScreen() {
  const { transactions, themeName, displayCurrency, rate } = useApp();
  const c = theme[themeName]; // Theme colors

  const totals = getTotals(transactions); // Calculate overall totals
  const summary = getCategorySummary(transactions); // Category totals

  const categories = Object.keys(summary).sort(); // Sort category names

  return (
    <ScrollView style={{ backgroundColor: c.background }} contentContainerStyle={styles.container}>
      <Text style={[styles.h1, { color: c.text }]}>Reports</Text>

      <View style={styles.block}>
        <Text style={[styles.h2, { color: c.text }]}>Overall Totals</Text>
        <Text style={[styles.line, { color: c.text }]}>
          Income: {displayCurrency} {(totals.income * rate).toFixed(2)}
        </Text>
        <Text style={[styles.line, { color: c.text }]}>
          Expenses: {displayCurrency} {(totals.expenses * rate).toFixed(2)}
        </Text>
        <Text style={[styles.line, { color: c.text }]}>
          Balance: {displayCurrency} {(totals.balance * rate).toFixed(2)}
        </Text>
      </View>

      <View style={styles.block}>
        <Text style={[styles.h2, { color: c.text }]}>By Category</Text>

        {categories.length === 0 ? (
          <Text style={[styles.line, { color: c.text, opacity: 0.7 }]}>No data to report.</Text>
        ) : (
          categories.map((cat) => {
            const income = summary[cat].income * rate; // Convert per category income
            const expense = summary[cat].expense * rate; // Convert per category expense
            return (
              <View key={cat} style={styles.row}>
                <Text style={[styles.cat, { color: c.text }]}>{cat}</Text>
                <Text style={[styles.line, { color: c.text }]}>
                  Income {displayCurrency} {income.toFixed(2)} | Expense {displayCurrency} {expense.toFixed(2)}
                </Text>
              </View>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  h1: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  h2: { fontSize: 16, fontWeight: "800", marginBottom: 8 },
  block: { marginBottom: 18 },
  line: { fontSize: 14, marginBottom: 6 },
  row: { marginBottom: 10 },
  cat: { fontSize: 15, fontWeight: "800" },
});
