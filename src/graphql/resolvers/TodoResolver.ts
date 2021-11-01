import { builder } from "../builder";
import { Todo } from "@prisma/client";
import { db } from "~/lib/prisma";

const TodoObject = builder.objectRef<Todo>("Todo");

TodoObject.implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    title: t.exposeString("title"),
    isDone: t.exposeBoolean("isDone"),
    createdAt: t.expose("createdAt", { type: Date }),
    updatedAt: t.expose("updatedAt", { type: Date }),
  }),
});

builder.queryField("todos", (t) =>
  t.field({
    type: [TodoObject],
    resolve: async () => {
      const todos = await db.todo.findMany();
      return todos;
    },
  })
);

const CreateTodoInput = builder.inputType("CreateTodoInput", {
  fields: (t) => ({
    title: t.string({ validate: { minLength: 1 } }),
  }),
});

builder.mutationField("createTodo", (t) =>
  t.field({
    type: TodoObject,
    args: {
      input: t.arg({ type: CreateTodoInput }),
    },
    resolve: async (_, { input }) => {
      const todo = await db.todo.create({ data: { title: input.title } });
      return todo;
    },
  })
);

const UpdateTodoInput = builder.inputType("UpdateTodoInput", {
  fields: (t) => ({
    id: t.id(),
    title: t.string(),
    isDone: t.boolean(),
  }),
});

builder.mutationField("updateTodo", (t) =>
  t.field({
    type: TodoObject,
    args: {
      input: t.arg({ type: UpdateTodoInput }),
    },
    resolve: async (_, { input }) => {
      const todo = await db.todo.update({
        where: { id: input.id },
        data: { title: input.title, isDone: input.isDone },
      });
      return todo;
    },
  })
);

const IdInput = builder.inputType("IdInput", {
  fields: (t) => ({
    id: t.id(),
  }),
});

builder.mutationField("deleteTodo", (t) =>
  t.field({
    type: TodoObject,
    args: {
      input: t.arg({ type: IdInput }),
    },
    resolve: async (_, { input }) => {
      const todo = await db.todo.delete({
        where: { id: input.id },
      });
      return todo;
    },
  })
);

builder.queryField("todo", (t) =>
  t.field({
    type: TodoObject,
    nullable: true,
    args: {
      input: t.arg({ type: IdInput }),
    },
    resolve: async (_, { input }) => {
      const todo = await db.todo.findUnique({ where: { id: input.id } });
      return todo;
    },
  })
);
