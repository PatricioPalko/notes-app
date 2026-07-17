import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Note } from "../types/globals";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Notes"],

  endpoints: (build) => ({
    getNotes: build.query<Note[], void>({
      query: () => `/notes`,
      providesTags: ["Notes"],
    }),
    addNote: build.mutation<Note, Note>({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        body: { ...note, createdAt: new Date().toISOString() },
      }),
      invalidatesTags: ["Notes"],
    }),
    updateNote: build.mutation<Note, Note>({
      query: (note) => ({
        url: `/notes/${note.id}`,
        method: "PUT",
        body: { ...note, updatedAt: new Date().toISOString() },
      }),
      invalidatesTags: ["Notes"],
    }),
    deleteNote: build.mutation<Note, string>({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notes"],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useAddNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi;
