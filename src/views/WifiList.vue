<template>
  <div id="app">
    <h2>Daftar Pelanggan WiFi</h2>

    <!-- Form Input Pelanggan -->
    <input v-model="newWifi.name" placeholder="Nama Pelanggan" /> <br>
    <input v-model="newWifi.nohp" placeholder="Nomor HP" /> <br>
    <input v-model="newWifi.alamat" placeholder="Alamat" /> <br>
    <select v-model="newWifi.paket">
      <option disabled value="">-- Pilih Paket Internet --</option>
      <option value="15 Mbps">15 Mbps - Rp165.000</option>
      <option value="25 Mbps">25 Mbps - Rp250.000</option>
      <option value="50 Mbps">50 Mbps - Rp450.000</option>
    </select> <br>
    <button @click="addWifi">Tambah</button>

    <!-- Tabel Daftar -->
    <table v-if="wifiList.length">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Nomor HP</th>
          <th>Alamat</th>
          <th>Paket Internet</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(wifi, index) in wifiList" :key="index">
          <template v-if="!wifi.editing">
            <td>{{ wifi.name }}</td>
            <td>{{ wifi.nohp }}</td>
            <td>{{ wifi.alamat }}</td>
            <td>{{ wifi.paket }}</td>
            <td>
              <button @click="editWifi(wifi)">Edit</button>
              <button @click="deleteWifi(index)">Hapus</button>
            </td>
          </template>
          <template v-else>
            <td><input v-model="wifi.name" /></td>
            <td><input v-model="wifi.nohp" /></td>
            <td><input v-model="wifi.alamat" /></td>
            <td>
              <select v-model="wifi.paket">
                <option disabled value="">-- Pilih Paket Internet --</option>
                <option value="15 Mbps">15 Mbps - Rp165.000</option>
                <option value="25 Mbps">25 Mbps - Rp250.000</option>
                <option value="50 Mbps">50 Mbps - Rp450.000</option>
              </select>
            </td>
            <td>
              <button @click="saveWifi(wifi)">Simpan</button>
              <button @click="deleteWifi(index)">Hapus</button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <p v-else>Tidak ada data Pelanggan WiFi.</p>
    </div>
</template>
<script>
export default {
  data() {
    return {
      newWifi: {
        name: '',
        nohp: '',
        alamat: '',
        paket: ''
      },
      wifiList: []
    }
  },
  methods: {
    addWifi() {
      if (
        this.newWifi.name &&
        this.newWifi.nohp &&
        this.newWifi.alamat &&
        this.newWifi.paket
      ) {
        this.wifiList.push({
          ...this.newWifi,
          editing: false
        })
        this.newWifi = { name: '', nohp: '', alamat: '', paket: '' }
      } else {
        alert('Mohon lengkapi semua data.')
      }
    },
    editWifi(wifi) {
      wifi.editing = true
    },
    saveWifi(wifi) {
      wifi.editing = false
    },
    deleteWifi(index) {
      if (confirm('Yakin ingin menghapus data ini?')) {
        this.wifiList.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
#app {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fefefe;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

/* --- Form Input Style --- */
.form-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-bottom: 15px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
}

button {
  padding: 8px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  margin: 4px 2px;
}

button:hover {
  opacity: 0.9;
}

button:nth-child(1),
.btn-primary {
  background-color: #3498db;
  color: white;
}

.btn-warning {
  background-color: #f39c12;
  color: white;
}

.btn-danger {
  background-color: #e74c3c;
  color: white;
}

/* --- Table Style --- */
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: white;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

th {
  background-color: #f4f4f4;
  color: #333;
}

p {
  text-align: center;
  font-style: italic;
  color: #777;
  margin-top: 20px;
}

/* --- RESPONSIVE UNTUK HANDPHONE --- */
@media (max-width: 768px) {
  .form-group {
    grid-template-columns: 1fr;
  }

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  thead {
    display: none;
  }

  tr {
    margin-bottom: 15px;
    border-bottom: 2px solid #ccc;
    padding-bottom: 10px;
  }

  td {
    position: relative;
    padding-left: 50%;
    text-align: left;
    border: none;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 15px;
    width: 45%;
    font-weight: bold;
    white-space: nowrap;
  }
}
</style>
