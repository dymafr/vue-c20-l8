import { defineStore } from 'pinia';
import { Todo } from '../interfaces/todo.interface';
import {
  fetchTodo,
  addTodo,
  deleteTodo,
  updateTodo,
} from '../services/todo.service';

interface TodoState {
  todos: Todo[];
}

export const useTodos = defineStore('todos', {
  state: (): TodoState => ({
    todos: [],
  }),
  getters: {
    todoList(state: TodoState) {
      return state.todos;
    },
  },
  actions: {
    async fetchTodo() {
      const todos = await fetchTodo();
      if (Array.isArray(todos)) {
        this.todos = todos;
      } else {
        this.todos = [todos];
      }
    },
    async addTodo(content: string) {
      const newTodo = await addTodo({
        content,
        done: false,
        editMode: false,
      });
      this.todos.push(newTodo);
    },
    async deleteTodo(todoId: string) {
      await deleteTodo(todoId);
      this.todos = this.todos.filter((todo) => todo._id !== todoId);
    },
    async updateTodo(todoId: string, update: Partial<Todo>) {
      const todoIndex = this.todos.findIndex((todo) => todo._id === todoId);
      const updatedTodo = await updateTodo(todoId, {
        ...this.todos[todoIndex],
        ...update,
      } as Todo);
      this.todos[todoIndex] = updatedTodo;
    },
  },
});
