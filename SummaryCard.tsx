// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Reusable summary card used on the Home screen.

import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  value: string;
  borderColor: string;
};

export default function SummaryCard({ label, value, borderColor }: Props) {
  return (
    <View style={[styles.card, { borderColor }]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 12,
    borderWidth: 2,
    margin: 6,
  },
  label: {
    fontSize: 14,
    opacity: 0.85,
  },
  value: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "700",
  },
});
