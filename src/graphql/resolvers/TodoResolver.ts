import { builder } from "../builder";

interface Todo {
  id: string;
}

const TodoObject = builder.objectRef<Todo>("Todo");

TodoObject.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
  }),
});

builder.queryField("todos", (t) =>
  t.field({
    type: [TodoObject],
    resolve: () => {
      return [{ id: "1" }];
    },
  })
);

const CreateTodoInput = builder.inputType("CreateTodoInput", {
  fields: (t) => ({
    id: t.string({ validate: { minLength: 1 } }),
  }),
});

builder.mutationField("createTodo", (t) =>
  t.field({
    type: TodoObject,
    args: {
      input: t.arg({ type: CreateTodoInput }),
    },
    resolve: (root, { input }, context) => {
      return { id: input.id };
    },
  })
);
