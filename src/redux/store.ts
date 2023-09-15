import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export type Todo = {
  id: number,
  message: string
}

export const TodoApi = createApi({
  reducerPath: 'TodoApi',
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    FetchAll: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: [{type: 'Todos', id: 'TodoList'}]
    }),
    AddTodo: builder.mutation<string, string>({
      query(message) {
        return {
          url: 'todos',
          method: 'POST',
          body: { message }
        };
      },
      invalidatesTags: [{type: 'Todos', id: 'TodoList'}]
    }),
    DeleteTodo: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: [{type: 'Todos', id: 'TodoList'}]
    }),
    UpdateTodo: builder.mutation<Todo, Todo>({
      query(todo) {
        return {
          url: `todos/${todo.id}`,
          method: 'PUT',
          body: todo
        };
      },
      invalidatesTags: [{type: 'Todos', id: 'TodoList'}]
    })
  })
})