// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Central app state for transactions, theme, and currency settings.

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadTransactions, saveTransactions } from "../storage/transactionsStorage";
import { ThemeName } from "../theme/theme";
import { Transaction } from "../types/Transaction";
import { fetchRates } from "../utils/currencyApi";

type AppState = {
  transactions: Transaction[];
  addTransaction: (t: Omit<Transaction, "id" | "createdAt">) => void;
  deleteTransaction: (id: string) => void;

  themeName: ThemeName;
  setThemeName: (t: ThemeName) => void;

  baseCurrency: string;
  setBaseCurrency: (c: string) => void;

  displayCurrency: string;
  setDisplayCurrency: (c: string) => void;

  rate: number;
  refreshRate: () => Promise<void>;
};

const AppContext = createContext<AppState | null>(null);

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`; // Simple unique id

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [themeName, setThemeName] = useState<ThemeName>("light");

  const [baseCurrency, setBaseCurrency] = useState<string>("USD"); // Base currency for API
  const [displayCurrency, setDisplayCurrency] = useState<string>("CAD"); // Currency user wants to see
  const [rate, setRate] = useState<number>(1); // Conversion rate from base -> display

  useEffect(() => {
    (async () => {
      const list = await loadTransactions(); // Load transactions from AsyncStorage
      setTransactions(list);
    })();
  }, []);

  useEffect(() => {
    saveTransactions(transactions); // Save whenever list changes
  }, [transactions]);

  const refreshRate = async () => {
    const data = await fetchRates(baseCurrency); // Get latest rates for base
    const next = data.rates?.[displayCurrency]; // Read selected display currency
    setRate(typeof next === "number" ? next : 1); // Default to 1 if missing
  };

  useEffect(() => {
    refreshRate(); // Refresh conversion rate when currencies change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCurrency, displayCurrency]);

  const addTransaction = (t: Omit<Transaction, "id" | "createdAt">) => {
    const newTx: Transaction = { ...t, id: makeId(), createdAt: Date.now() }; // Add id and timestamp
    setTransactions((prev) => [newTx, ...prev]); // Add to top
  };

  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id)); // Remove by id
  };

  const value = useMemo<AppState>(
    () => ({
      transactions,
      addTransaction,
      deleteTransaction,
      themeName,
      setThemeName,
      baseCurrency,
      setBaseCurrency,
      displayCurrency,
      setDisplayCurrency,
      rate,
      refreshRate,
    }),
    [transactions, themeName, baseCurrency, displayCurrency, rate]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppState => {
  const ctx = useContext(AppContext); // Read global app state
  if (!ctx) throw new Error("useApp must be used inside AppProvider"); // Safety check
  return ctx;
};
