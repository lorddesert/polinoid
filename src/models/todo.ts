import { openDatabaseConnection } from "../utils/utils"

type Todo = {
  id: string,
  title: string,
  body: string
}

export class TodoModel {
  async getAll() {
    const db = await openDatabaseConnection()
    const allTodos =  await db.select("select * from todo;")

    db.close()
    return allTodos
  }
}