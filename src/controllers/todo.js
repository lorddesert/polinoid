import { TodoModel } from '../models/todo'

export class TodoController {
  static async getAll() {
    return await TodoModel.getAll()
  }
  static async getFilteredTodos({ limit, order, orderColumn }) {
    return await TodoModel.getFilteredTodos({ limit, order, orderColumn })
  }
  static async modifyTodo(todo) {
    return await TodoModel.modifyTodo(todo)
  }
  static async createTodo(todo) {
    return await TodoModel.createTodo(todo)
  }
  static async deleteTodo(todo) {
    return await TodoModel.deleteTodo(todo)
  }
}