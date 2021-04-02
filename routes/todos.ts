import { Router } from "https://deno.land/x/oak/mod.ts";

import { TodoObject } from "../utils/interfacesFiles.ts";

const router = new Router();

let todos: TodoObject[] = [];

router.get("/todos", (ctx) => {
  ctx.response.body = {
    todos: todos,
  };
});

router.post("/todos", async (ctx) => {
  const result = ctx.request.body(); // getting the value promise
  const data = await result.value; //getting the values from the body

  const newTodo: TodoObject = {
    id: Math.random() * 100,
    text: data.text,
  };

  todos.push(newTodo);
  ctx.response.body = {
    message: "Created a new todo",
    newTodo: newTodo,
  };
});

router.put("/todos/:id", async (ctx) => {
  const todoId = ctx.params.id;
  const todoIndex: number = todos.findIndex(
    (item) => item.id.toString() === todoId
  );
  if (todoIndex === -1) {
    ctx.response.body = {
      message: "Can't find the following todos",
    };
    return;
  }
  const data = ctx.request.body();
  const result = await data.value;
  todos[todoIndex] = { ...todos[todoIndex], text: result.text };
  ctx.response.body = {
    message: "Updated the todo!",
    todos: todos,
  };
});

router.delete("/todos/:id", (ctx) => {
  const todoId: string = ctx.params.id as string;
  const todoIndex: number = todos.findIndex(
    (todo) => todo.id.toString() === todoId
  );
  if (todoIndex === -1) {
    ctx.response.body = {
      message: "Can't find the requested todo!",
    };
    return;
  }

  todos = todos.filter((todo) => todo.id.toString() !== todoId);
  ctx.response.body = {
    message: "Deleted the todo",
    todos: todos,
  };
});

export default router;
