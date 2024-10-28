import { apiSlice } from "./apiSlice"
import { TODO_URL } from "../../constants"

export const todoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: ({ term, sort }) => ({
        url: TODO_URL,
        params: { term, sort },
      }),
    }),
    createTodo: builder.mutation({
      query: (body) => ({
        url: TODO_URL,
        method: "POST",
        body,
      }),
    }),
    editTodo: builder.mutation({
      query: (body) => ({
        url: `${TODO_URL}/${body.id}`,
        method: "PUT",
        body,
      }),
    }),
    editTodoStatus: builder.mutation({
      query: (body) => ({
        url: `${TODO_URL}/${body.id}/status`,
        method: "PUT",
        body,
      }),
    }),
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `${TODO_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
})

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useEditTodoStatusMutation,
} = todoApiSlice
