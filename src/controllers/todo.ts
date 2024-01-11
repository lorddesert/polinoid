import { Todo, TodoModel } from '../models/todo'

export class TodoController {
  static async getAll() {
    return await TodoModel.getAll()
  }
  //@ts-ignore
  static async getFilteredTodos({ limit, order, orderColumn }) {
    return await TodoModel.getFilteredTodos({ limit, order, orderColumn })
  }
  static async modifyTodo(todo: Todo) {
    return await TodoModel.modifyTodo(todo)
  }
  static async createTodo(todo: Todo) {
    return await TodoModel.createTodo(todo)
  }
  static async deleteTodo(todo: Todo) {
    return await TodoModel.deleteTodo(todo)
  }
}