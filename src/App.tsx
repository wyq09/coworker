import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./styles/globals.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-purple-900 dark:to-indigo-900">
      {/* 顶部导航栏 - Liquid Glass 效果 */}
      <nav className="glass sticky top-0 z-50 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gradient">
            Coworker
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">Desktop App</span>
          </div>
        </div>
      </nav>

      {/* 主内容区域 */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* 欢迎卡片 */}
        <div className="glass-card mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
            Welcome to Coworker Desktop
          </h2>
          <p className="text-text-secondary mb-6">
            Built with Tauri + React + Liquid Glass Design System
          </p>

          {/* Logo 行 */}
          <div className="flex items-center justify-center gap-8 mb-8">
            <a href="https://tauri.app" target="_blank" rel="noreferrer" className="tap-highlight">
              <img src="/tauri.svg" className="h-16 transition-transform hover:scale-110" alt="Tauri logo" />
            </a>
            <a href="https://vite.dev" target="_blank" rel="noreferrer" className="tap-highlight">
              <img src="/vite.svg" className="h-16 transition-transform hover:scale-110" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank" rel="noreferrer" className="tap-highlight">
              <img src="/react.svg" className="h-16 transition-transform hover:scale-110" alt="React logo" />
            </a>
          </div>

          {/* 交互表单 */}
          <form
            className="flex items-center gap-4 max-w-md mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              greet();
            }}
          >
            <input
              className="glass-input flex-1"
              onChange={(e) => setName(e.currentTarget.value)}
              placeholder="Enter your name..."
              value={name}
            />
            <button
              type="submit"
              className="glass-button gradient-bg text-white font-medium px-6 py-3 rounded-xl"
            >
              Greet
            </button>
          </form>

          {/* 结果显示 */}
          {greetMsg && (
            <div className="mt-6 text-center animate-scale-in">
              <p className="text-lg font-medium text-brand-primary">{greetMsg}</p>
            </div>
          )}
        </div>

        {/* 功能特性卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass-card hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary to-brand-secondary flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-sm text-text-secondary">Built with Rust and Tauri for native performance</p>
          </div>

          <div className="glass-card hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-secondary to-brand-accent flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Liquid Glass UI</h3>
            <p className="text-sm text-text-secondary">Beautiful glassmorphism design inspired by iOS 26</p>
          </div>

          <div className="glass-card hover:scale-105 transition-transform duration-200">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-accent to-brand-primary flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Cross-Platform</h3>
            <p className="text-sm text-text-secondary">Works on macOS, Windows, and Linux</p>
          </div>
        </div>
      </main>

      {/* 底部状态栏 */}
      <footer className="fixed bottom-0 left-0 right-0 glass border-t border-white/10">
        <div className="max-w-4xl mx-auto px-6 py-3 flex items-center justify-between text-sm text-text-secondary">
          <span>v0.1.0</span>
          <span>Built with ❤️ using Tauri + React</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
