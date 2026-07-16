import type { Note } from "../types/globals";

const API_URL = import.meta.env.VITE_API_URL;

export async function getNotesData() {
  const response = await fetch(`${API_URL}/notes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch notes");
  }

  const data = (await response.json()) as Note[];
  return data;
}
