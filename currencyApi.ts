// Course: MAD201 – Project 2
// Name: Jennyfer Parmar
// Student ID: A00201240
// Date: 12/12/25
// Description: Fetches live currency rates using the required API endpoint.

export const fetchRates = async (base: string) => {
  const url = `https://api.exchangerate-api.com/v4/latest/${base}`; // API endpoint from project doc
  const res = await fetch(url); // Fetch latest rates
  if (!res.ok) throw new Error("Failed to fetch currency rates"); // Basic error handling
  return (await res.json()) as { base: string; rates: Record<string, number> }; // Return parsed JSON
};
