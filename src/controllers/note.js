import { NoteModel } from '../models/note'

export class NoteController {
  static async getAll() {
    return await NoteModel.getAll()
  }

  static async createNote(note) {
    return await NoteModel.createNote(note)
  }

  static async deleteNote(note) {
    return await NoteModel.deleteNote(note)
  }

  static async updateNote(note) {
    return await NoteModel.modifyNote()
  }

  static async getFilteredNotes({
    limit = 1,
    order = 'ASC',
    orderColumn = 'id'
  }) {
    return await NoteModel.getFilteredNotes({ limit, order, orderColumn })
  }
}