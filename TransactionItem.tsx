// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Renders one transaction row with a delete button.

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Transaction } from "../types/Transaction";

type Props = {
  item: Transaction;
  currencyLabel: string;
  convertedAmount: number;
  onDelete: (id: string) => void;
  incomeColor: string;
  expenseColor: string;
  textColor: string;
  cardColor: string;
};

export default function TransactionItem({
  item,
  currencyLabel,
  convertedAmount,
  onDelete,
  incomeColor,
  expenseColor,
  textColor,
  cardColor,
}: Props) {
  const color = item.type === "income" ? incomeColor : expenseColor; // Color by type

  return (
    <View style={[styles.row, { backgroundColor: cardColor, borderColor: color }]}>
      <View style={styles.left}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.meta, { color: textColor }]} numberOfLines={1}>
          {item.category} · {item.type}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={[styles.amount, { color }]}>
          {currencyLabel} {convertedAmount.toFixed(2)}
        </Text>
        <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.deleteBtn}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  left: {
    flex: 1,
  },
  right: {
    alignItems: "flex-end",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
  meta: {
    marginTop: 4,
    fontSize: 12,
    opacity: 0.8,
  },
  amount: {
    fontSize: 14,
    fontWeight: "700",
  },
  deleteBtn: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: "#00000010",
  },
  deleteText: {
    fontSize: 12,
    fontWeight: "700",
  },
});
