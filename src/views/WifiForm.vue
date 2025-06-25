<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const nohp = ref('')
const alamat = ref('')
const paket = ref('')

const saveWifi = async () => {
  const newData = { name: name.value, nohp: nohp.value, alamat: alamat.value, paket: paket.value }

  const response = await fetch('/api/wifi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newData)
  })

  const data = await response.json()
  if (data.success) {
    alert('Data berhasil ditambahkan!')
    router.push('/')
  }
}
</script>

<template>
  <div>
    <h2>Tambah Pelanggan WiFi</h2>
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
  </div>
</template>
