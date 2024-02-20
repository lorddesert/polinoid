import SQLite from 'tauri-plugin-sqlite-api'
import { invoke } from '@tauri-apps/api/tauri'

export async function openDatabaseConnection(envPath?: boolean) {
  try {
    let dbPath = ''

    if (envPath) {
      dbPath = import.meta.env.DB_PATH
      return await SQLite.open(dbPath)
    }
  
    dbPath = await invoke('get_db_path')
    return await SQLite.open(dbPath)    
  } catch (error) {
    console.log(error)
  }

}
type Card = {
  title: string,
  description: string,
  status: "backlog" | "wip" | "done"
}

export type { Card }