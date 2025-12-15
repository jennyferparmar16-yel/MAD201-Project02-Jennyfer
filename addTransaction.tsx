// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Form to add a transaction and save it using global state (AsyncStorage persists automatically).

import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useApp } from "../src/context/AppContext";
import { theme } from "../src/theme/theme";
import { TransactionType } from "../src/types/Transaction";

const CATEGORIES = ["Food", "Rent", "Transport", "Bills", "Shopping", "Salary", "Other"]; // Simple category list

export default function AddTransactionScreen() {
  const { addTransaction, themeName } = useApp();
  const c = theme[themeName]; // Theme colors

  const [title, setTitle] = useState<string>(""); // Title input
  const [amount, setAmount] = useState<string>(""); // Amount input as string
  const [type, setType] = useState<TransactionType>("expense"); // Default to expense
  const [category, setCategory] = useState<string>(CATEGORIES[0]); // Default first category

  const parsedAmount = useMemo(() => Number(amount), [amount]); // Parse amount once

  const onSave = () => {
    const cleanTitle = title.trim(); // Remove extra spaces
    if (!cleanTitle) return Alert.alert("Validation", "Please enter a title."); // Required
    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) return Alert.alert("Validation", "Enter a valid amount > 0."); // Required

    addTransaction({ title: cleanTitle, amount: parsedAmount, type, category }); // Add transaction
    router.back(); // Go back after save
  };

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.h1, { color: c.text }]}>Add Transaction</Text>

      <Text style={[styles.label, { color: c.text }]}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="e.g., Grocery"
        placeholderTextColor={c.text + "88"}
        style={[styles.input, { borderColor: c.border, color: c.text }]}
      />

      <Text style={[styles.label, { color: c.text }]}>Amount</Text>
      <TextInput
        value={amount}
        onChangeText={setAmount}
        placeholder="e.g., 25.50"
        placeholderTextColor={c.text + "88"}
        keyboardType="decimal-pad"
        style={[styles.input, { borderColor: c.border, color: c.text }]}
      />

      <Text style={[styles.label, { color: c.text }]}>Type</Text>
      <View style={styles.pillRow}>
        <TouchableOpacity
          onPress={() => setType("income")}
          style={[styles.pill, { borderColor: c.border, backgroundColor: type === "income" ? c.card : "transparent" }]}
        >
          <Text style={{ color: c.text, fontWeight: "700" }}>Income</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setType("expense")}
          style={[styles.pill, { borderColor: c.border, backgroundColor: type === "expense" ? c.card : "transparent" }]}
        >
          <Text style={{ color: c.text, fontWeight: "700" }}>Expense</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.label, { color: c.text }]}>Category</Text>
      <View style={styles.catWrap}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            onPress={() => setCategory(cat)}
            style={[styles.cat, { borderColor: c.border, backgroundColor: category === cat ? c.card : "transparent" }]}
          >
            <Text style={{ color: c.text }}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={[styles.btn, { backgroundColor: c.accent }]} onPress={onSave}>
        <Text style={styles.btnText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  h1: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: "700" },
  input: { borderWidth: 1, borderRadius: 12, padding: 12 },
  pillRow: { flexDirection: "row", gap: 10, marginTop: 6 },
  pill: { flex: 1, borderWidth: 1, padding: 12, borderRadius: 12, alignItems: "center" },
  catWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 6 },
  cat: { borderWidth: 1, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 12 },
  btn: { marginTop: 18, padding: 14, borderRadius: 12, alignItems: "center" },
  btnText: { color: "#ffffff", fontWeight: "800" },
});
