<script setup lang="ts">
import { RouterView } from "vue-router"
import TheHeader from "@/components/layout/TheHeader.vue"
</script>

<template>
  <div>
    <TheHeader />
    <RouterView />
  </div>
</template>

<style scoped lang="scss"></style>
