# 🚀 RAXXSLINK - Pro URL Shortener

![RAXXSLINK Banner](https://img.shields.io/badge/Status-Live-success?style=for-the-badge&logoColor=white) 
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

**RAXXSLINK** adalah aplikasi penyingkat URL (URL Shortener) modern dengan estetika **Premium Dark Mode** dan efek *Glassmorphism*. Aplikasi ini dibangun secara *self-hosted* menggunakan Node.js dan MongoDB Atlas untuk memastikan kontrol penuh atas data dan pengalihan link.

---

## ✨ Fitur Unggulan

- **Premium UI**: Desain antarmuka modern yang memanjakan mata dengan responsivitas tinggi.
- **Base64 Shortcoding**: Menghasilkan kode unik 6 karakter yang aman dan singkat.
- **Smart Protocol Handling**: Otomatis mendeteksi dan menambahkan protokol (`http/https`) jika pengguna lupa.
- **Vercel Serverless Ready**: Dioptimasi khusus untuk berjalan di arsitektur serverless Vercel.
- **Persistent Storage**: Data link disimpan secara permanen di cloud (MongoDB Atlas).

---

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism), JavaScript.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas via Mongoose.
- **Deployment**: Vercel.

---

## 🚀 Instalasi Lokal

Ikuti langkah-langkah berikut untuk menjalankan RAXXSLINK di komputer pribadimu:

1. **Clone Repository**
   ```bash
   git clone https://github.com/kahfiiii/raxxslink.git
   cd raxxslink
   ```

2. **Install Dependensi**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   Buat file `.env` di root directory dan masukkan kredensial berikut:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Jalankan Aplikasi**
   ```bash
   npm run dev
   ```
   Buka `http://localhost:3000` di browsermu.

---

## ⚙️ Konfigurasi Environment (Vercel)

Saat mendeploy ke Vercel, pastikan kamu menambahkan variabel berikut di **Project Settings > Environment Variables**:

| Key | Value |
| --- | --- |
| `MONGODB_URI` | Link koneksi MongoDB Atlas kamu |

---

## 📂 Struktur Folder

```text
raxxslink/
├── api/            # Serverless Entry Point (Vercel)
├── src/
│   ├── models/     # Mongoose Schemas
│   ├── routes/     # API Routes
│   ├── services/   # Business Logic (Link Creator)
│   └── db.js       # Database Connection Helper
├── public/         # Static Files (Hanya jika lokal)
├── index.html      # Homepage (Root for Vercel)
├── style.css       # Styles (Root for Vercel)
├── script.js       # Frontend Logic (Root for Vercel)
├── vercel.json     # Deployment Configuration
└── package.json    # Project Metadata & Scripts
```

---

## 🤝 Kontribusi

Kontribusi selalu terbuka! Silakan lakukan *Fork* repository ini dan buat *Pull Request* jika kamu punya ide fitur baru yang keren.

---

## 📄 Lisensi

Proyek ini berada di bawah lisensi MIT.

---

**Dibuat dengan ❤️ oleh [RAXXSLINK API](https://raxxslink.vercel.app/)**
