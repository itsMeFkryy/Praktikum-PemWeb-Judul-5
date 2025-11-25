# Praktikum-PemWeb-Judul-5

## Nama : Alfikri Deo Putra
## NPM  : 2315061075

# Fitur
## Operasi Matematika
- Operasi dasar: Penambahan, pengurangan, perkalian, pembagian
- Angka desimal: Mendukung penggunaan titik desimal
- Perhitungan berantai: Dapat melanjutkan perhitungan dari hasil sebelumnya
- Penanganan error: Peringatan saat melakukan pembagian dengan nol

## Fungsi Memory
- MC (Memory Clear): Menghapus nilai yang tersimpan di memory
- MR (Memory Recall): Menampilkan nilai dari memory
- M+ (Memory Add): Menambahkan nilai display ke memory
- M- (Memory Subtract): Mengurangi memory dengan nilai display

## Riwayat Perhitungan
- Menyimpan 5 perhitungan terakhir
- Dapat menghapus semua riwayat
- Tampilan history yang terorganisir

## Support Keyboard
- Input menggunakan keyboard untuk angka dan operasi
- Enter untuk tombol sama dengan (=)
- Escape untuk clear (C)
- Backspace untuk clear entry (CE)

## Struktur Kode
Proyek terdiri dari tiga file utama: index.html untuk struktur antarmuka, style.css untuk tampilan dan layout, serta script.js yang berisi logika kalkulator.
Kelas Calculator merupakan inti dari aplikasi, mengelola state kalkulator termasuk input saat ini, operasi yang dipilih, nilai memory, dan riwayat perhitungan. Kelas ini menangani event dari tombol dan keyboard, melakukan kalkulasi matematika, serta mengupdate tampilan secara real-time.
