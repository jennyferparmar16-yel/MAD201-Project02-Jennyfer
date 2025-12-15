// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Defines the Transaction type and structure used
// throughout the Smart Budget Tracker Lite application.

// Represents the allowed transaction types
export type TransactionType = "income" | "expense";

// Represents a single financial transaction
export interface Transaction {
  id: string;          // Unique identifier for the transaction
  title: string;       // Short description of the transaction
  amount: number;      // Transaction amount
  type: TransactionType; // Indicates income or expense
  category: string;    // Category such as Food, Rent, Salary
}
