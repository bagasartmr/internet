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

