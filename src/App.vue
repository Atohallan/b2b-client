<script setup lang="ts">
import { RouterView } from "vue-router"
import TheHeader from "@/components/layout/TheHeader.vue"
import TheFooter from "@/components/layout/TheFooter.vue"
</script>

<template>
  <div class="app-grid">
    <TheHeader />
    <RouterView />
    <TheFooter />
  </div>
</template>

<style scoped lang="scss">
.app-grid {
  display: grid;
  grid-template-rows: auto 1fr auto;
  height: 100vh;
}
</style>
