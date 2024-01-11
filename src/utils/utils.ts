import SQLite from 'tauri-plugin-sqlite-api'
import { invoke } from '@tauri-apps/api/tauri'

export async function openDatabaseConnection(envPath?: boolean) {
  let dbPath = ''

  if (envPath) {
    dbPath = import.meta.env.DB_PATH
    return await SQLite.open(dbPath)
  }

  dbPath = await invoke('get_db_path')
  return await SQLite.open(dbPath)
}

type CardStatus = "backlog" | "in progres" | "done"

type Card = {
  title: string,
  description: string,
  status: CardStatus
}

export type { Card, CardStatus }