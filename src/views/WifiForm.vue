<template>
  <div>
    <h2>Tambah Data Pelanggan WiFi</h2>
    <form @submit.prevent="saveWifi">
      <input v-model="name" placeholder="Nama" /><br />
      <input v-model="nohp" placeholder="No HP" /><br />
      <input v-model="alamat" placeholder="Alamat" /><br />
      <select v-model="paket">
        <option disabled value="">-- Pilih Paket --</option>
        <option value="15 Mbps">15 Mbps - Rp165.000</option>
        <option value="25 Mbps">25 Mbps - Rp250.000</option>
        <option value="50 Mbps">50 Mbps - Rp450.000</option>
      </select><br />
      <button type="submit">Simpan</button>
    </form>

    <h2>Daftar Pelanggan WiFi</h2>
    <table v-if="wifiList.length">
      <thead>
        <tr>
          <th>Nama</th>
          <th>No HP</th>
          <th>Alamat</th>
          <th>Paket</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="wifi in wifiList" :key="wifi.id">
          <template v-if="wifi.editing">
            <td label="Nama"><input v-model="wifi.name" /></td>
            <td label="No HP"><input v-model="wifi.nohp" /></td>
            <td label="Alamat"><input v-model="wifi.alamat" /></td>
            <td label="Paket">
              <select v-model="wifi.paket">
                <option value="15 Mbps">15 Mbps - Rp165.000</option>
                <option value="25 Mbps">25 Mbps - Rp250.000</option>
                <option value="50 Mbps">50 Mbps - Rp450.000</option>
              </select>
            </td>
            <td label="Aksi">
              <button @click="updateWifi(wifi)">Simpan</button>
              <button @click="cancelEdit(wifi)">Batal</button>
            </td>
          </template>

          <template v-else>
            <td label="Nama">{{ wifi.name }}</td>
            <td label="No HP">{{ wifi.nohp }}</td>
            <td label="Alamat">{{ wifi.alamat }}</td>
            <td label="Paket">{{ wifi.paket }}</td>
            <td label="Aksi">
              <button @click="editRow(wifi)">Edit</button>
              <button @click="deleteWifi(wifi.id)">Hapus</button>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
    <p v-else>Tidak ada data pelanggan WiFi.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const name = ref('')
const nohp = ref('')
const alamat = ref('')
const paket = ref('')
const wifiList = ref([])

const fetchData = async () => {
  const res = await fetch('/api/wifi')
  const data = await res.json()
  wifiList.value = data.map(item => ({
    ...item,
    editing: false,
    original: { ...item }
  }))
}

const saveWifi = async () => {
  if (!name.value || !nohp.value || !alamat.value || !paket.value) {
    alert('Mohon lengkapi semua data!')
    return
  }

  const newData = {
    name: name.value,
    nohp: nohp.value,
    alamat: alamat.value,
    paket: paket.value
  }

  const response = await fetch('/api/wifi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  })

  const data = await response.json()
  if (data.success) {
    name.value = ''
    nohp.value = ''
    alamat.value = ''
    paket.value = ''
    fetchData()
  }
}

const deleteWifi = async (id) => {
  const confirmDelete = confirm('Yakin ingin menghapus data ini?')
  if (!confirmDelete) return

  await fetch(`/api/wifi/${id}`, {
    method: 'DELETE'
  })
  fetchData()
}

const editRow = (wifi) => {
  wifi.original = { ...wifi }
  wifi.editing = true
}

const cancelEdit = (wifi) => {
  wifi.name = wifi.original.name
  wifi.nohp = wifi.original.nohp
  wifi.alamat = wifi.original.alamat
  wifi.paket = wifi.original.paket
  wifi.editing = false
}

const updateWifi = async (wifi) => {
  const response = await fetch(`/api/wifi/${wifi.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: wifi.name,
      nohp: wifi.nohp,
      alamat: wifi.alamat,
      paket: wifi.paket
    })
  })

  const data = await response.json()
  if (data.success) {
    wifi.editing = false
    fetchData()
  }
}

onMounted(() => {
  fetchData()
})
</script>
