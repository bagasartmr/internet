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
        </tr>
      </thead>
      <tbody>
        <tr v-for="wifi in wifiList" :key="wifi.id">
          <td>{{ wifi.name }}</td>
          <td>{{ wifi.nohp }}</td>
          <td>{{ wifi.alamat }}</td>
          <td>{{ wifi.paket }}</td>
          <td>
          <button @click="startEdit(wifi)">Edit</button>
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
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')
const nohp = ref('')
const alamat = ref('')
const paket = ref('')

const wifiList = ref([])

// State Edit
const isEditMode = ref(false)
const editId = ref(null)

// Fungsi Mulai Edit
const startEdit = (wifi) => {
  isEditMode.value = true
  editId.value = wifi.id
  name.value = wifi.name
  nohp.value = wifi.nohp
  alamat.value = wifi.alamat
  paket.value = wifi.paket
}

const fetchData = async () => {
  const res = await fetch('/api/wifi')
  wifiList.value = await res.json()
}

const saveWifi = async () => {
  if (!name.value || !nohp.value || !alamat.value || !paket.value) {
    alert('Mohon lengkapi semua data.');
    return;
  }

  const newData = {
    name: name.value,
    nohp: nohp.value,
    alamat: alamat.value,
    paket: paket.value
  };

  let response;
  if (isEditMode.value && editId.value !== null) {
    // Jika sedang mode edit
    response = await fetch(`/api/wifi/${editId.value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });
  } else {
    // Jika sedang menambahkan data baru
    response = await fetch('/api/wifi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });
  }

  const data = await response.json();
  if (data.success) {
    name.value = '';
    nohp.value = '';
    alamat.value = '';
    paket.value = '';
    isEditMode.value = false;
    editId.value = null;
    fetchData();
  }
}


onMounted(() => {
  fetchData()
})

const deleteWifi = async (id) => {
  const confirmDelete = confirm('Yakin ingin menghapus data ini?')
  if (!confirmDelete) return

  await fetch(`/api/wifi/${id}`, {
    method: 'DELETE'
  })

  await fetchData()
}
</script>