# ClosofCode CLI

Antarmuka terminal (TUI) untuk [opencode](https://github.com/anomalyco/opencode).

Repo ini adalah fork. Semua mesin agen — provider, session, tool, MCP, LSP — berasal dari upstream. Yang disesuaikan di sini terutama lapisan tampilan.

## Menjalankan

Butuh [Bun](https://bun.sh).

```bash
bun install
bun dev
```

Perintah lain:

```bash
bun run --cwd packages/opencode src/index.ts --help
bun run --cwd packages/opencode src/index.ts run "pertanyaanmu"
bun run --cwd packages/opencode src/index.ts models
```

Di Windows, jalankan lewat Windows Terminal, bukan `cmd.exe`.

## Konfigurasi

Config global: `~/.config/opencode/opencode.json`.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "contoh": {
      "name": "Contoh",
      "npm": "@ai-sdk/openai-compatible",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "isi-api-key-kamu"
      },
      "models": {
        "nama-model": { "name": "Nama Model" }
      }
    }
  }
}
```

## Struktur

```
packages/
  opencode/   runtime agen, server, CLI
  tui/        antarmuka terminal
  core/       utilitas bersama
  sdk/        klien SDK
  schema/     kontrak data
```

## Lisensi

MIT, mengikuti [opencode](https://github.com/anomalyco/opencode).
