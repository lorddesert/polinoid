import SQLite from 'tauri-plugin-sqlite-api'
import { invoke } from '@tauri-apps/api/tauri'

export async function openDatabaseConnection() {
  const dbPath: string = await invoke('get_db_path')

  return await SQLite.open(dbPath)
}

export type CardStatus = ["backlog", "in progres", "done"]

export type Card = {
  title: string,
  description: string,
  status: CardStatus
}