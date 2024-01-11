import { openDatabaseConnection } from "../utils/utils"

type Note = {
  id?: number,
  title: string,
  body?: string
}

export type { Note }

export class NoteModel {
  static async getAll() {
    const db = await openDatabaseConnection()
    let AllNotes: Note[] = []
    try {
      AllNotes = await db.select("select * from note;")
    } catch (e) {
      console.log('Error trying to fetch all todos:')
      console.log(e)
    }

    db.close()
    return AllNotes
  }

  static async getFilteredNotes(
    {
      limit,
      order = 'ASC',
      orderColumn = 'id'
    }: {
      limit?: number | undefined,
      order?: 'ASC' | 'DESC',
      orderColumn?: 'id' | 'title' | 'description'
    }) {
    const db = await openDatabaseConnection(true)
    try {
      const filteredNotes: Note[] = await db.select(`select * from note order by ${orderColumn} ${order} ${limit && `limit ${limit}`} ;`)

      db.close()
      return filteredNotes
    } catch (e) {
      console.log('Error trying to fetch filtered todos:')
      console.log(e)
      db.close()
    }
  }

  static async modifyNote(note: Note) {
    const db = await openDatabaseConnection()
    try {
      await db.execute(`update note set title = ${note.title}, description=${note.body} where id = ${note.id};`)
      await db.close()
    } catch (e) {
      console.log(`Error trying to modify note: `)
      console.log(e)
    }

    db.close()
  }

  static async deleteNote(note: Note) {
    const db = await openDatabaseConnection()

    await db.execute(`delete from note where id = ${note.id};`)

    db.close()
  }


  static async createNote(note: Note) {
    const db = await openDatabaseConnection()

    await db.execute(`insert into note (title, description) values (${note.title},${note.body} );`)

    db.close()
  }
}