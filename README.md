# ClosofCode CLI

ClosofCode CLI adalah antarmuka terminal (TUI) untuk [opencode](https://github.com/anomalyco/opencode) — agen AI untuk coding. Repo ini berisi fork dengan tampilan yang sudah disesuaikan.

> **Catatan penting:** ini bukan proyek dari nol. Ini fork dari opencode (MIT). Semua mesin agen — provider, session, tool, MCP, LSP — berasal dari upstream. Yang diubah di sini terutama lapisan tampilan (`packages/tui`).

## Preview

<!-- Ganti placeholder di bawah dengan screenshot/GIF asli milikmu -->

> 📷 **Screenshot/GIF preview belum ditambahkan.**
>
> Rekam sendiri TUI-nya lalu simpan sebagai `docs/preview.png` (atau `.gif`),
> hapus baris ini, dan ganti dengan:
>
> ```markdown
> ![ClosofCode CLI](./docs/preview.png)
> ```
>
> Langkah lengkapnya ada di [docs/README.md](./docs/README.md).

## Apa yang berbeda dari upstream

Bagian yang disesuaikan:

- **Layar pembuka di dalam chat.** Panel `ClosofCode local` tampil di awal percakapan: logo ASCII, ringkasan perintah, nama model, pemakaian konteks, dan info environment.
- **Info pemakaian konteks.** Baris token + progress bar di bagian bawah input.
- **Gaya pesan.** Pesan pengguna diberi prefiks `>`, dan dipisahkan garis tipis dari jawaban.
- **Indikator berpikir.** Teks `Thinking...` dengan animasi opacity halus sebelum jawaban mengalir, di dalam blok jawaban yang sama (bukan elemen terpisah).
- **Label.** Nama tampilan di UI memakai "ClosofCode".

Perubahan ini tersebar di `packages/tui/src`, antara lain:
- `routes/session/welcome.tsx` — panel pembuka
- `routes/session/index.tsx` — gaya pesan dan indikator berpikir
- `component/prompt/index.tsx` — input dan baris status
- `logo.ts`, `app.tsx`, `attention.ts` — label dan logo

## Menjalankan

Butuh [Bun](https://bun.sh) (versi dipatok di `package.json`).

```bash
bun install
bun dev
```

`bun dev` langsung membuka TUI di dalam terminal.

Perintah lain:

```bash
bun run --cwd packages/opencode src/index.ts --help   # daftar semua perintah
bun run --cwd packages/opencode src/index.ts run "pertanyaanmu"
bun run --cwd packages/opencode src/index.ts models
```

Windows: jalankan lewat **Windows Terminal**, bukan `cmd.exe`, agar tampilan TUI tidak rusak.

## Konfigurasi

Config global ada di `~/.config/opencode/opencode.json`. Contoh menambahkan provider custom (OpenAI-compatible):

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

## Struktur repo

Monorepo Bun. Yang paling relevan:

```
packages/
  opencode/   runtime agen, server, CLI
  tui/        antarmuka terminal (bagian yang paling banyak diubah di sini)
  core/       utilitas bersama
  sdk/        klien SDK
  schema/     kontrak data
```

## Lisensi

MIT, mengikuti upstream [opencode](https://github.com/anomalyco/opencode). Lihat [LICENSE](./LICENSE).
