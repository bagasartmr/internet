<template>
  <div class="container">
    <h2>{{ isEditing ? 'Edit' : 'Tambah' }} Data Pelanggan WiFi</h2>

    <form @submit.prevent="saveWifi" class="form">
      <input v-model="name" placeholder="Nama" /><br />
      <input v-model="nohp" placeholder="No HP" /><br />
      <input v-model="alamat" placeholder="Alamat" /><br />
      <select v-model="paket">
        <option disabled value="">-- Pilih Paket --</option>
        <option value="15 Mbps">15 Mbps - Rp165.000</option>
        <option value="25 Mbps">25 Mbps - Rp250.000</option>
        <option value="50 Mbps">50 Mbps - Rp450.000</option>
      </select><br />
      <button type="submit">{{ isEditing ? 'Update' : 'Simpan' }}</button>
      <button v-if="isEditing" type="button" @click="cancelEdit">Batal</button>
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
          <td>{{ wifi.name }}</td>
          <td>{{ wifi.nohp }}</td>
          <td>{{ wifi.alamat }}</td>
          <td>{{ wifi.paket }}</td>
          <td>
            <button @click="editRow(wifi)">Edit</button>
            <button @click="deleteWifi(wifi.id)">Hapus</button>
          </td>
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
const isEditing = ref(false)
const editId = ref(null)

const wifiList = ref([])

const fetchData = async () => {
  const res = await fetch('/api/wifi')
  wifiList.value = await res.json()
}

const saveWifi = async () => {
  if (!name.value || !nohp.value || !alamat.value || !paket.value) {
    alert('Mohon lengkapi semua data!')
    return
  }

  const dataPayload = {
    name: name.value,
    nohp: nohp.value,
    alamat: alamat.value,
    paket: paket.value
  }

  if (isEditing.value) {
    // UPDATE
    const res = await fetch(`/api/wifi/${editId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataPayload)
    })
    const result = await res.json()
    if (result.success) {
      isEditing.value = false
      editId.value = null
    }
  } else {
    // CREATE
    const res = await fetch('/api/wifi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataPayload)
    })
    await res.json()
  }

  // Reset form
  name.value = ''
  nohp.value = ''
  alamat.value = ''
  paket.value = ''
  fetchData()
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
  name.value = wifi.name
  nohp.value = wifi.nohp
  alamat.value = wifi.alamat
  paket.value = wifi.paket
  editId.value = wifi.id
  isEditing.value = true
}

const cancelEdit = () => {
  isEditing.value = false
  editId.value = null
  name.value = ''
  nohp.value = ''
  alamat.value = ''
  paket.value = ''
}

onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  padding: 1rem;
}
input, select, button {
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
}
table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ccc;
  padding: 0.5rem;
  text-align: left;
}
button {
  margin-right: 0.5rem;
}
@media screen and (max-width: 600px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }
  thead {
    display: none;
  }
  td {
    position: relative;
    padding-left: 50%;
    border: none;
    border-bottom: 1px solid #ddd;
  }
  td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    font-weight: bold;
  }
}
</style>
