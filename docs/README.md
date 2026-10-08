# Aset preview

README memakai `./docs/preview.png`. Isi folder ini dengan aset milikmu sendiri.

## Yang dibutuhkan

| File | Dipakai di | Keterangan |
| --- | --- | --- |
| `preview.png` | `README.md` | Tangkapan layar TUI, disarankan lebar >= 1200px |
| `preview.gif` | opsional | Rekaman singkat alur menjalankan `bun dev` |

## Cara merekam

TUI adalah program terminal, jadi rekam dari terminal — bukan dengan perekam layar penuh. Dua cara:

### Windows

1. Buka **Windows Terminal**, jalankan `bun dev`.
2. Rekam dengan [ScreenToGif](https://www.screentogif.com/) — pilih area jendela terminal saja.
3. Simpan sebagai `preview.gif` atau ekspor frame jadi `preview.png`.

### Lintas platform (asciinema)

```bash
# instal: https://asciinema.org
asciinema rec preview.cast
# jalankan bun dev, lakukan beberapa aksi, lalu ctrl+d untuk selesai
# unggah (opsional) lalu sematkan di README sebagai link
```

Untuk `terminalizer` (menghasilkan GIF):

```bash
npm i -g terminalizer
terminalizer record preview
terminalizer render preview -o docs/preview.gif
```

## Tips agar hasil rapi

- Perbesar sedikit font terminal, dan pakai ukuran jendela yang konsisten.
- Rekam 10-20 detik saja: buka TUI, kirim satu pesan, tunjukkan jawaban mengalir.
- Jangan sertakan API key atau path pribadi di rekaman.
- Pastikan tema terminal kontras (teks terang di latar gelap) supaya terbaca di GitHub.

## Menyematkan di README

```markdown
![ClosofCode CLI](./docs/preview.png)
```

Untuk GIF, ganti `preview.png` jadi `preview.gif`. GitHub memutar GIF otomatis.
