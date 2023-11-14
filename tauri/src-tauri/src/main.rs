// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    println!("Hello, {name}! You've been greeted from Rust!");
    format!("Hello, {name}! You've been greeted from Rust!!")
}

#[tauri::command]
fn load_note(name: &str) -> String {
    let path = std::path::Path::new("./notes").join(name);
    println!("Loading note {name} {:?}", std::fs::canonicalize(&path));
    match std::fs::read_to_string(path) {
        Ok(v) => v,
        Err(err) => {
            eprintln!("Error reading file: {err:?}");
            "".into()
        }
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, load_note])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
