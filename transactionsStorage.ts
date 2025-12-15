// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Provides AsyncStorage helpers to save and load transactions.

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Transaction } from "../types/Transaction";

const KEY = "transactions";

export const loadTransactions = async (): Promise<Transaction[]> => {
  const raw = await AsyncStorage.getItem(KEY); // Read stored JSON string
  if (!raw) return []; // Return empty list if nothing saved
  try {
    return JSON.parse(raw) as Transaction[]; // Parse JSON into typed array
  } catch {
    return []; // If parsing fails, return empty list
  }
};

export const saveTransactions = async (list: Transaction[]): Promise<void> => {
  await AsyncStorage.setItem(KEY, JSON.stringify(list)); // Store as JSON string
};
