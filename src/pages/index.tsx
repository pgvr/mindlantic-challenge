import type { NextPage } from "next";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import {
  useCreateTodoMutation,
  useTodosQuery,
  useUpdateTodoMutation,
} from "../graphql/__generated__";
import Link from "next/link";

const Home: NextPage = () => {
  const queryClient = useQueryClient();
  const { data } = useTodosQuery();
  const { mutate: createTodo } = useCreateTodoMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["Todos"]);
    },
  });
  const { mutate: updateTodo } = useUpdateTodoMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["Todos"]);
    },
  });
  const [title, setTitle] = useState("");
  return (
    <div>
      <h1>Todos</h1>
      {data?.todos.map((todo) => (
        <Link key={todo.id} href={`/todos/${todo.id}`} passHref>
          <div>
            <span>
              {todo.title}
              {todo.isDone && " (Done)"}
            </span>
            <button
              onClick={(evt) => {
                evt.stopPropagation();
                updateTodo({
                  input: {
                    id: todo.id,
                    title: todo.title,
                    isDone: !todo.isDone,
                  },
                });
              }}
            >
              {todo.isDone ? "Mark Undone" : "Mark Done"}
            </button>
          </div>
        </Link>
      ))}
      <input
        value={title}
        onChange={(evt) => {
          setTitle(evt.target.value);
        }}
      />
      <button
        onClick={() => {
          if (title) {
            createTodo({ input: { title } });
            setTitle("");
          }
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

export default Home;
