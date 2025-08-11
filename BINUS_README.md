# 🎓 Binus University Internship Alumni System

Sistem manajemen alumni internship untuk Binus University yang terpisah dari sistem Telu University, dengan database dan API yang independen.

## ✨ Fitur Utama

- **Manajemen Project**: Tambah, edit, hapus project internship
- **Manajemen Member**: Tambah, edit, hapus member tim
- **Kategori Project**: Filter berdasarkan kategori teknologi
- **Search & Filter**: Pencarian project dan filter berdasarkan kategori
- **Database Terpisah**: Data Binus tersimpan terpisah dari Telu
- **API Independen**: Endpoint API khusus untuk data Binus

## 🚀 Cara Menjalankan

### 1. Setup Database Binus
```bash
# Jalankan script seeding untuk membuat database dan data awal
node binseed.js
```

### 2. Jalankan Server Binus
```bash
# Jalankan server Binus saja (port 3001)
node binus-server.js
```

### 3. Jalankan Kedua Server Bersama
```bash
# Jalankan kedua server (Telu + Binus) secara bersamaan
node start-servers.js
```

## 🌐 Port dan URL

- **Telu University**: http://localhost:3000
- **Binus University**: http://localhost:3001
- **Halaman Binus**: http://localhost:3000/binus.html

## 📊 Struktur Database

### Tabel Projects
- `id`: Primary key
- `team`: Nama tim (unique)
- `title`: Judul project
- `category`: Kategori project
- `link`: Link project
- `year`: Tahun project

### Tabel Members
- `id`: Primary key
- `name`: Nama member
- `team`: Nama tim (foreign key ke projects.team)
- `major`: Jurusan
- `role`: Peran dalam tim

## 🔧 API Endpoints

### Projects
- `GET /api/projects` - Ambil semua project
- `POST /api/projects` - Buat project baru
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Hapus project

### Members
- `GET /api/members` - Ambil semua member
- `POST /api/members` - Buat member baru
- `PUT /api/members/:id` - Update member
- `DELETE /api/members/:id` - Hapus member

## 📁 File Struktur

```
internship-dev/
├── binus.html              # Halaman utama Binus
├── binus-server.js         # Server API untuk Binus
├── binseed.js              # Script seeding data Binus
├── binus.db                # Database SQLite untuk Binus
├── start-servers.js        # Script menjalankan kedua server
├── telu.html               # Halaman utama Telu
├── server.js               # Server API untuk Telu
├── internship.db           # Database SQLite untuk Telu
└── styles.css              # Styling untuk kedua halaman
```

## 🎯 Kategori Project

1. **Blockchain & Web3**
2. **Cybersecurity & Data Privacy**
3. **AI & Machine Learning**
4. **Web Development & Digital Platforms**
5. **IoT & Embedded Systems**

## 💡 Cara Penggunaan

### Menambah Project Baru
1. Klik tombol "+ Add Project"
2. Isi form dengan data project
3. Pilih kategori yang sesuai
4. Klik "Add Project"

### Menambah Member Baru
1. Klik tombol "+ Add Member" (akan muncul setelah ada project)
2. Isi nama, pilih tim, jurusan, dan peran
3. Klik "Add Member"

### Edit/Delete Data
- Gunakan tombol "Edit" atau "Remove" pada setiap baris data
- Konfirmasi sebelum menghapus data

### Search & Filter
- Gunakan search bar untuk mencari project/tim
- Gunakan filter kategori untuk melihat project berdasarkan teknologi

## 🔒 Keamanan

- Validasi input pada semua form
- Sanitasi data sebelum disimpan ke database
- Error handling yang komprehensif
- Konfirmasi sebelum menghapus data

## 🐛 Troubleshooting

### Server tidak bisa start
- Pastikan port 3000 dan 3001 tidak digunakan aplikasi lain
- Pastikan semua dependencies terinstall: `npm install`

### Database error
- Hapus file `binus.db` dan jalankan ulang `node binseed.js`
- Pastikan folder memiliki permission write

### Halaman tidak load
- Pastikan kedua server berjalan
- Cek console browser untuk error JavaScript
- Pastikan URL yang diakses benar

## 📞 Support

Untuk bantuan teknis, hubungi:
- Email: procodecg@gmail.com
- Phone: (+62)8122015409

---

**Dibuat dengan ❤️ oleh Tim ProcodeCG** 