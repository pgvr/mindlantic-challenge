import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from 'react-query';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(query: string, variables?: TVariables) {
  return async (): Promise<TData> => {
    const res = await fetch("http://localhost:3000/api/graphql", {
    method: "POST",
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      const { message } = json.errors[0];

      throw new Error(message);
    }

    return json.data;
  }
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type CreateTodoInput = {
  title: Scalars['String'];
};

export type IdInput = {
  id: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  deleteTodo: Todo;
  updateTodo: Todo;
};


export type MutationCreateTodoArgs = {
  input: CreateTodoInput;
};


export type MutationDeleteTodoArgs = {
  input: IdInput;
};


export type MutationUpdateTodoArgs = {
  input: UpdateTodoInput;
};

export type Query = {
  __typename?: 'Query';
  todo?: Maybe<Todo>;
  todos: Array<Todo>;
};


export type QueryTodoArgs = {
  input: IdInput;
};

export type Todo = {
  __typename?: 'Todo';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isDone: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type UpdateTodoInput = {
  id: Scalars['ID'];
  isDone: Scalars['Boolean'];
  title: Scalars['String'];
};

export type CreateTodoMutationVariables = Exact<{
  input: CreateTodoInput;
}>;


export type CreateTodoMutation = { __typename?: 'Mutation', createTodo: { __typename?: 'Todo', id: string, title: string, isDone: boolean } };

export type DeleteTodoMutationVariables = Exact<{
  input: IdInput;
}>;


export type DeleteTodoMutation = { __typename?: 'Mutation', deleteTodo: { __typename?: 'Todo', id: string, title: string, isDone: boolean } };

export type UpdateTodoMutationVariables = Exact<{
  input: UpdateTodoInput;
}>;


export type UpdateTodoMutation = { __typename?: 'Mutation', updateTodo: { __typename?: 'Todo', id: string, title: string, isDone: boolean } };

export type TodoQueryVariables = Exact<{
  input: IdInput;
}>;


export type TodoQuery = { __typename?: 'Query', todo?: { __typename?: 'Todo', id: string, title: string, isDone: boolean, createdAt: any, updatedAt: any } | null | undefined };

export type TodosQueryVariables = Exact<{ [key: string]: never; }>;


export type TodosQuery = { __typename?: 'Query', todos: Array<{ __typename?: 'Todo', id: string, title: string, isDone: boolean }> };


export const CreateTodoDocument = `
    mutation CreateTodo($input: CreateTodoInput!) {
  createTodo(input: $input) {
    id
    title
    isDone
  }
}
    `;
export const useCreateTodoMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<CreateTodoMutation, TError, CreateTodoMutationVariables, TContext>) =>
    useMutation<CreateTodoMutation, TError, CreateTodoMutationVariables, TContext>(
      (variables?: CreateTodoMutationVariables) => fetcher<CreateTodoMutation, CreateTodoMutationVariables>(CreateTodoDocument, variables)(),
      options
    );
export const DeleteTodoDocument = `
    mutation DeleteTodo($input: IdInput!) {
  deleteTodo(input: $input) {
    id
    title
    isDone
  }
}
    `;
export const useDeleteTodoMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<DeleteTodoMutation, TError, DeleteTodoMutationVariables, TContext>) =>
    useMutation<DeleteTodoMutation, TError, DeleteTodoMutationVariables, TContext>(
      (variables?: DeleteTodoMutationVariables) => fetcher<DeleteTodoMutation, DeleteTodoMutationVariables>(DeleteTodoDocument, variables)(),
      options
    );
export const UpdateTodoDocument = `
    mutation UpdateTodo($input: UpdateTodoInput!) {
  updateTodo(input: $input) {
    id
    title
    isDone
  }
}
    `;
export const useUpdateTodoMutation = <
      TError = unknown,
      TContext = unknown
    >(options?: UseMutationOptions<UpdateTodoMutation, TError, UpdateTodoMutationVariables, TContext>) =>
    useMutation<UpdateTodoMutation, TError, UpdateTodoMutationVariables, TContext>(
      (variables?: UpdateTodoMutationVariables) => fetcher<UpdateTodoMutation, UpdateTodoMutationVariables>(UpdateTodoDocument, variables)(),
      options
    );
export const TodoDocument = `
    query Todo($input: IdInput!) {
  todo(input: $input) {
    id
    title
    isDone
    createdAt
    updatedAt
  }
}
    `;
export const useTodoQuery = <
      TData = TodoQuery,
      TError = unknown
    >(
      variables: TodoQueryVariables,
      options?: UseQueryOptions<TodoQuery, TError, TData>
    ) =>
    useQuery<TodoQuery, TError, TData>(
      ['Todo', variables],
      fetcher<TodoQuery, TodoQueryVariables>(TodoDocument, variables),
      options
    );
export const TodosDocument = `
    query Todos {
  todos {
    id
    title
    isDone
  }
}
    `;
export const useTodosQuery = <
      TData = TodosQuery,
      TError = unknown
    >(
      variables?: TodosQueryVariables,
      options?: UseQueryOptions<TodosQuery, TError, TData>
    ) =>
    useQuery<TodosQuery, TError, TData>(
      variables === undefined ? ['Todos'] : ['Todos', variables],
      fetcher<TodosQuery, TodosQueryVariables>(TodosDocument, variables),
      options
    );