// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Displays all transactions using FlatList and allows deletion.

import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import TransactionItem from "../../src/components/TransactionItem";
import { useApp } from "../../src/context/AppContext";
import { theme } from "../../src/theme/theme";

export default function TransactionsScreen() {
  const { transactions, deleteTransaction, themeName, displayCurrency, rate } = useApp();
  const c = theme[themeName]; // Theme colors

  return (
    <View style={[styles.container, { backgroundColor: c.background }]}>
      <Text style={[styles.h1, { color: c.text }]}>All Transactions</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id} // Unique key for list items
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={<Text style={{ color: c.text, opacity: 0.7 }}>No transactions yet.</Text>}
        renderItem={({ item }) => (
          <TransactionItem
            item={item}
            currencyLabel={displayCurrency}
            convertedAmount={item.amount * rate} // Convert per item
            onDelete={deleteTransaction}
            incomeColor={c.income}
            expenseColor={c.expense}
            textColor={c.text}
            cardColor={c.card}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  h1: { fontSize: 20, fontWeight: "800", marginBottom: 12 },
});
