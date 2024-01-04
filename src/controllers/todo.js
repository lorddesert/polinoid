import { TodoModel } from '../models/todo'

export class TodoController {
  static async getAll() {
    const todoModel = new TodoModel()

    const allTodos = await todoModel.getAll()

    return allTodos
  }
}