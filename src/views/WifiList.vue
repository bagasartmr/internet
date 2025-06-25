<template>
  <div>
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
        </tr>
      </tbody>
    </table>
    <p v-else>Tidak ada data pelanggan.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const wifiList = ref([])

onMounted(async () => {
  const res = await fetch('/api/wifi')
  wifiList.value = await res.json()
})
</script>
