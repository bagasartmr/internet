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
  max-width: 960px;
  margin: 30px auto;
  padding: 24px;
  font-family: 'Segoe UI', sans-serif;
  background: #f0f8ff; /* biru sangat muda */
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 20px;
}

.form-section {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 24px;
}

.form-section input,
.form-section select {
  flex: 1 1 250px;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  background-color: #fff;
}

.btn {
  padding: 10px 14px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
  transition: 0.2s;
}

.btn.primary {
  background-color: #3b82f6; /* biru lembut */
  color: white;
}

.btn.warning {
  background-color: #facc15; /* kuning lembut */
  color: #333;
}

.btn.danger {
  background-color: #ef4444; /* merah lembut */
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  padding: 12px 10px;
  border-bottom: 1px solid #eee;
  text-align: left;
}

th {
  background-color: #f3f4f6; /* abu terang */
  color: #333;
}

input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.no-data {
  text-align: center;
  color: #888;
  margin-top: 30px;
  font-style: italic;
}

/* Responsive layout */
@media (max-width: 600px) {
  .form-section {
    flex-direction: column;
  }

  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
    width: 100%;
  }

  thead {
    display: none;
  }

  tr {
    background: #fff;
    margin-bottom: 15px;
    border-radius: 6px;
    padding: 10px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  }

  td {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: none;
  }

  td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #444;
  }
}
</style>