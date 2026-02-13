// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Mutex;
use tauri::State;

/// 应用状态
#[derive(Debug, Serialize, Deserialize)]
pub struct Conversation {
    id: String,
    title: String,
    messages: Vec<Message>,
    created_at: u64,
    updated_at: u64,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Message {
    id: String,
    role: String,
    content: String,
    timestamp: u64,
}

#[derive(Debug, Default)]
pub struct AppState {
    conversations: Mutex<HashMap<String, Conversation>>,
}

/// 原有的 greet 命令
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to Coworker!", name)
}

/// 发送消息
#[tauri::command]
fn send_message(
    state: State<AppState>,
    conversation_id: &str,
    content: &str,
) -> Result<Message, String> {
    let message = Message {
        id: uuid::Uuid::new_v4().to_string(),
        role: "user".to_string(),
        content: content.to_string(),
        timestamp: std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap()
            .as_secs(),
    };

    // 更新会话（简化版）
    let mut conversations = state.conversations.lock().unwrap();
    if let Some(conversation) = conversations.get_mut(conversation_id) {
        conversation.messages.push(message.clone());
        conversation.updated_at = message.timestamp;
    }

    Ok(message)
}

/// 获取所有会话
#[tauri::command]
fn get_conversations(state: State<AppState>) -> Vec<Conversation> {
    let conversations = state.conversations.lock().unwrap();
    conversations.values().cloned().collect()
}

/// 创建新会话
#[tauri::command]
fn create_conversation(
    state: State<AppState>,
    title: &str,
) -> Result<Conversation, String> {
    let id = uuid::Uuid::new_v4().to_string();
    let now = std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .unwrap()
        .as_secs();

    let conversation = Conversation {
        id: id.clone(),
        title: title.to_string(),
        messages: Vec::new(),
        created_at: now,
        updated_at: now,
    };

    let mut conversations = state.conversations.lock().unwrap();
    conversations.insert(id, conversation.clone());

    Ok(conversation)
}

/// 删除会话
#[tauri::command]
fn delete_conversation(
    state: State<AppState>,
    id: &str,
) -> Result<bool, String> {
    let mut conversations = state.conversations.lock().unwrap();
    Ok(conversations.remove(id).is_some())
}

/// 获取用户设置
#[tauri::command]
fn get_settings() -> Result<serde_json::Value, String> {
    Ok(serde_json::json!({
        "theme": {
            "mode": "auto",
            "accentColor": "#6366F1"
        },
        "notifications": true,
        "sound": true,
        "language": "zh-CN"
    }))
}

/// 更新用户设置
#[tauri::command]
fn update_settings(settings: serde_json::Value) -> Result<bool, String> {
    // 这里可以添加保存到本地存储的逻辑
    Ok(true)
}

/// 导出数据
#[tauri::command]
fn export_data() -> Result<String, String> {
    // 简化版：返回 JSON 字符串
    Ok(serde_json::json!({"exported": true}).to_string())
}

/// 导入数据
#[tauri::command]
fn import_data(file_path: &str) -> Result<bool, String> {
    // 这里可以添加从文件导入的逻辑
    Ok(true)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .manage(AppState::default())
        .invoke_handler(tauri::generate_handler![
            greet,
            send_message,
            get_conversations,
            create_conversation,
            delete_conversation,
            get_settings,
            update_settings,
            export_data,
            import_data
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
