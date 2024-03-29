import { openDatabaseConnection } from "../utils/utils"

type Todo = {
  id: string,
  title: string,
  description: string,
  status: "backlog" | "wip" | "done"
}

export type { Todo }

export class TodoModel {
  static async getAll() {
    const db = await openDatabaseConnection()
    let allTodos: Todo[] = []
    try {
      allTodos = await db!.select("select * from todo;")
    } catch (e) {
      console.log('Error trying to fetch all todos:')
      console.log(e)
    }

    db!.close()
    return allTodos
  }

  static async getFilteredTodos(
    {
      limit,
      order = 'ASC',
      orderColumn = 'id'
    }: {
      limit?: number | undefined,
      order?: 'ASC' | 'DESC',
      orderColumn?: 'id' | 'title' | 'body'
    }) {
    const db = await openDatabaseConnection(true)
    try {
      const filteredTodos: Todo[] = await db!.select(`select * from todo order by ${orderColumn} ${order} ${limit && `limit ${limit}`} ;`)

      db!.close()
      return filteredTodos
    } catch (e) {
      console.log('Error trying to fetch filtered todos:')
      console.log(e)
      db!.close()
    }
  }

  static async modifyTodo(todo: Todo) {
    let db
    try {
      db = await openDatabaseConnection()
      await db!.execute(`update todo set title = :title, description = :description, status = :status where id = :id;`, [
        todo.title,
        todo.description,
        todo.status,
        todo.id
      ])
      await db!.close()
    } catch (e) {
      console.log(`Error trying to modify todo: `)
      console.log(e)
    }
  }

  static async deleteTodo(todo: Todo) {
    const db = await openDatabaseConnection()

    await db!.execute(`delete from todo where id = ${todo.id};`)

    db!.close()
  }


  static async createTodo(todo: Todo) {
    const db = await openDatabaseConnection()

    await db!.execute(`insert into todo (title, description, status) values (:title, :description, :status);`, [todo.title, todo.description, todo.status])

    db!.close()
  }
}