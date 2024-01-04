// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod db;
use db::get_db_path;

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_sqlite::init())
        .setup(|_app| {
            // Initialize the database.
            db::init();

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet, get_db_path])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}