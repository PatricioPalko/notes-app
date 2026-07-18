import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Note, NoteFormValues, UpdateNoteArgs } from "../types/globals";

export const notesApi = createApi({
  reducerPath: "notesApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Notes"],

  endpoints: (build) => ({
    getNotes: build.query<Note[], void>({
      query: () => `/notes`,
      providesTags: ["Notes"],
    }),

    addNote: build.mutation<Note, NoteFormValues>({
      query: (note) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...note,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      }),
      invalidatesTags: ["Notes"],
    }),

    updateNote: build.mutation<Note, UpdateNoteArgs>({
      query: ({ id, values }) => ({
        url: `/notes/${id}`,
        method: "PATCH",
        body: { ...values, updatedAt: new Date().toISOString() },
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
