import { Note, NoteModel } from '../models/note'

export class NoteController {
  static async getAll() {
    return await NoteModel.getAll()
  }

  static async createNote(note: Note) {
    return await NoteModel.createNote(note)
  }

  static async deleteNote(note: Note) {
    return await NoteModel.deleteNote(note)
  }

  static async updateNote(note: Note) {
    return await NoteModel.modifyNote(note)
  }

  static async getFilteredNotes({
    limit = 1,
    order = "ASC",
    orderColumn = 'id'
  }) {
    //@ts-ignore
    return await NoteModel.getFilteredNotes({ limit, order, orderColumn })
  }
}