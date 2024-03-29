use std::fs;
use std::path::Path;
use sqlite::open;
use std::env;

// Check if a database file exists, and create one if it does not.
pub fn init() {
    if !db_file_exists() {
        create_db_file();
        create_db_tables();
    }
}

fn create_db_tables() {
    let connection = open(get_db_path()).unwrap();
        
    connection.execute("create table todo (
            id integer primary key  autoincrement, 
            title text,
            description text,
            status text default 'backlog'
        );").unwrap();

    connection.execute("create table note (
            id integer primary key  autoincrement,
            title text,
            body text,
            draft integer
        );").unwrap();
}

// Create the database file.
fn create_db_file() {
    let db_path = get_db_path();
    let db_dir = Path::new(&db_path).parent().unwrap();

    // If the parent directory does not exist, create it.
    if !db_dir.exists() {
        fs::create_dir_all(db_dir).unwrap();
    }

    // Create the database file.
    fs::File::create(db_path).unwrap();
}

// Check whether the database file exists.
fn db_file_exists() -> bool {
    let db_path = get_db_path();
    Path::new(&db_path).exists()
}

// Get the path where the database file should be located.
#[tauri::command]
pub fn get_db_path() -> String {
    let home_dir = dirs::home_dir().unwrap();
    if env::consts::OS  == "windows" {
        home_dir.to_str().unwrap().to_string() + "\\polinoid-vault\\database.sqlite"
    } else {
        home_dir.to_str().unwrap().to_string() + "/polinoid-vault/database.sqlite"
    }
}