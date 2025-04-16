## Step 1: Create a Compute Engine Instance

1. Go to **Compute Engine > VM Instances** in GCP.
2. Click **Create Instance** and set the following configurations:
   - **Name**: frontend-instance
   - **Region**: asia-southeast2-a
   - **Machine Type**: `n2-standard-2`
   - **Boot Disk**: Ubuntu 22.04 (ubuntu-2204-jammy-v20250312)
   - **Storage**: 20 GB
   - **Firewall**: Allow **HTTP**, dan HTTPS.
3. Click **Create** to launch the instance.

---

## Step 2: Prepare the Server

### Update System Packages

Connect to the instance via SSH and run:

```sh
sudo apt update && sudo apt upgrade -y
```

## Step 3: Clone and Set Up the Backend

### Configure SSH Key for GitHub

Generate SSH key:

```sh
ssh-keygen -t ed25519 -C "your-email@example.com"
```

Copy the key:

```sh
cat ~/.ssh/id_ed25519.pub
```

Add this key to **GitHub > Settings > SSH and GPG keys**.

### Clone the Repository

```sh
git clone git@github.com:twentiecker/cvm_frontend.git
```

### Install nvm and Node.js 20.18.1

Follow the installation guide from:
[nvm Installation](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

After installation, install Node.js:

```sh
nvm install 20.18.1
nvm use 20.18.1
```

### Example .env
# Konfigurasi API
VITE_API_BASE_URL=http://<your-ip-or-url>:<port>/api
VITE_API_VERSION=/v1

### Build project

masuk ke folder nya
kodenya
cd cvm_frontend

lalu install module
kodenya
npm install

lalu siapkan .env file
VITE_API_BASE_URL=https://api-siperi.duckdns.org/api
VITE_API_VERSION=/v1

lalu build app nya
kodeny
npn run build

### Instalasi nginx

ikutin instalasi versi stable, bukan yang mainline panduan di link ini
https://nginx.org/en/linux_packages.html#Ubuntu

setelah itu cek runnign atau tidak nginx nya
kodenya
sudo systemctl status nginx

kalo belum running, restart nginxnya
kodeny
sudo systemctl restart nginx

akses ip external apakah sudah bisa apa belum memunculkan nginx welcone page

setelah itu lakukan ini
**menambahkan `nginx` ke grup `learifandhi` adalah solusi yang bagus**, karena:

- **Nginx (`nginx`) tetap bisa baca folder `dist/`**
- **User `learifandhi` tetap bisa `git pull` tanpa error permission**

✅ **Cara ini aman dan best practice** selama permission-nya diatur dengan benar.

---

## **🔹 Cara Setup (Best Practice)**

1️⃣ **Tambahkan `nginx` ke grup `learifandhi`**

```bash
sudo usermod -aG learifandhi nginx
```

2️⃣ **Pastikan `dist/` memiliki group `learifandhi`**

```bash
sudo chown -R learifandhi:learifandhi /home/learifandhi/cvm_frontend/dist
```

3️⃣ **Beri hak akses ke grup (`nginx`) supaya bisa membaca dan mengeksekusi file**

```bash
sudo chmod -R 750 /home/learifandhi/cvm_frontend/dist
```

4️⃣ **Pastikan folder `/home/learifandhi` bisa diakses oleh `nginx`**

```bash
sudo chmod 751 /home/learifandhi
```

---

## **🔹 Apakah Ada Potensi Kendala?**

🔹 **Setelah menambahkan `nginx` ke grup `learifandhi`, logout dan login lagi supaya efeknya aktif.**

```bash
sudo systemctl restart nginx
```

🔹 **Pastikan setiap file baru dari `git pull` tetap memakai group `learifandhi`**, caranya:

```bash
sudo chmod g+s /home/learifandhi/cvm_frontend/dist
```

**Ini memastikan file baru tetap mewarisi group `learifandhi`.**

---

cek file konfigurasi di lokasi ini:
ls -l /etc/nginx/conf.d/

Kalau ada file .conf, coba lihat isinya:
kodenya
cat /etc/nginx/conf.d/default.conf

Kalau tidak ada, kamu bisa buat konfigurasi default:
kodenya
sudo nano /etc/nginx/conf.d/default.conf

edit konfigurasinya ke dist project
kodenya
sudo nano /etc/nginx/conf.d/default.conf

ubah bagian root menjadi
kodenya
root /home/learifandhi/cvm_frontend/dist

kemudian tambahkan code ini
try_files $uri /index.html;

di block kode location /
di bagian paling bawah sehingga bentunya seperti ni
location / {
root /home/learifandhi/cvm_frontend/dist;
index index.html index.htm;
try_files $uri /index.html;
}

---

tambahan untuk buat jadi https

- buat domain di [duckdns.org](https://www.duckdns.org)
- update ip domain dengan EXTERNAL IP instance-siperi-backend
- install nginx melalui link [nginx](https://nginx.org/en/linux_packages.html#Ubuntu)
- Konfigurasi Nginx untuk FastAPI
  Buat file konfigurasi baru untuk FastAPI:
  sudo nano /etc/nginx/conf.d/siperi.conf

Tambahkan konfigurasi ini:
server {
listen 80;
server_name siperi.duckdns.org;

    location / {
        root /home/learifandhi/cvm_frontend/dist;
        index index.html;
        try_files $uri /index.html;
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
        root /usr/share/nginx/html;
    }

}

Restart & Cek Status Nginx
sudo systemctl restart nginx
sudo systemctl status nginx

Cek Nginx enbale atau tidak
systemctl is-enabled nginx

jika tidak aktifkan dengan kode ini:
sudo systemctl enable nginx

Pastikan statusnya active (running) dan enabled. 🚀

- Pasang HTTPS dengan Let’s Encrypt
  Sekarang tambahkan SSL gratis dari Let’s Encrypt:
  sudo apt install certbot python3-certbot-nginx -y
  sudo certbot --nginx -d api-siperi.duckdns.org

Kalau sukses, domain kamu sudah bisa diakses dengan HTTPS:
https://siperi.duckdns.org

Pastikan SSL bisa diperbarui otomatis:
sudo certbot renew --dry-run

- restart nginx lagi
  sudo systemctl restart nginx

---- stop instance frontend ----

1. stop nginx: sudo systemctl stop nginx
2. setelah semua mati (pastikan mati ya!!!), kemudian sync
3. lakukan shutdown dengan kode: sudo shutdown -h now
4. stop instance dari menu vm instance
