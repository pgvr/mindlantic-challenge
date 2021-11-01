import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useState } from "react";
import { useQueryClient } from "react-query";
import {
  useDeleteTodoMutation,
  useTodoQuery,
  useUpdateTodoMutation,
} from "../../graphql/__generated__";

const TodoDetail: NextPage = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = router.query;
  const { data } = useTodoQuery(
    { input: { id: id as string } },
    {
      onSuccess: (data) => {
        setTitle(data.todo?.title ?? "");
      },
    }
  );
  const { mutate: updateTodo } = useUpdateTodoMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["Todo", { input: { id } }]);
    },
  });
  const { mutate: deleteTodo } = useDeleteTodoMutation({
    onSuccess: () => {
      router.replace("/");
    },
  });
  const [title, setTitle] = useState("");
  return data?.todo ? (
    <div>
      <h1>
        <span>Todo Title:</span>
        <input
          value={title}
          onChange={(evt) => {
            setTitle(evt.target.value);
          }}
        />
        <button
          onClick={() => {
            if (title) {
              updateTodo({
                input: { id: data.todo!.id, isDone: data.todo!.isDone, title },
              });
            }
          }}
        >
          Update Title
        </button>
      </h1>
      <h2>Created at: {new Date(data.todo.createdAt).toLocaleString()}</h2>
      <button
        onClick={() => {
          updateTodo({
            input: {
              id: data.todo!.id,
              title: data.todo!.title,
              isDone: !data.todo!.isDone,
            },
          });
        }}
      >
        {data.todo.isDone ? "Mark Undone" : "Mark Done"}
      </button>
      <button
        onClick={() => {
          deleteTodo({ input: { id: data.todo!.id } });
        }}
      >
        Delete
      </button>
    </div>
  ) : (
    <div>Not found</div>
  );
};

export default TodoDetail;
