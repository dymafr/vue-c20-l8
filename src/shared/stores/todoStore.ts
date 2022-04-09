import { defineStore } from 'pinia';
import { Todo } from '../interfaces/todo.interface';
import { Filter } from '../types';
import {
  fetchTodo,
  addTodo,
  deleteTodo,
  updateTodo,
} from '../services/todo.service';

interface TodoState {
  todos: Todo[];
  filter: Filter;
}

export const useTodos = defineStore('todos', {
  state: (): TodoState => ({
    todos: [],
    filter: 'all',
  }),
  getters: {
    todoList(state: TodoState) {
      return state.todos;
    },
    filteredTodoList(state: TodoState): Todo[] {
      if (state.filter === 'all') {
        return this.todoList;
      } else if (state.filter === 'done') {
        return this.todoList.filter((t) => t.done);
      } else {
        return this.todoList.filter((t) => !t.done);
      }
    },
  },
  actions: {
    updateFilter(filter: Filter) {
      this.filter = filter;
    },
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
