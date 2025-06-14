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
.wifi-app {
  max-width: 900px;
  margin: 30px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.08);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

input,
select {
  flex: 1 1 200px;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  padding: 8px 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.btn {
  font-weight: bold;
}

.primary {
  background-color: #007bff;
  color: white;
}

.warning {
  background-color: #ffc107;
  color: #333;
}

.danger {
  background-color: #dc3545;
  color: white;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f1f1f1;
}

.no-data {
  text-align: center;
  color: #999;
  margin-top: 20px;
  font-style: italic;
}
</style>