<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark({
  selector: "body",
  attribute: "theme",
  valueDark: "custom-dark",
});
const toggleDark = useToggle(isDark);
</script>

<template>
  <header>
    <div class="top-btn-container">
      <button @click="toggleDark()" type="button" role="button" aria-label="Mode Toggle">
        <font-awesome-icon :icon="isDark ? 'fa-solid fa-moon' : 'fa-solid fa-sun'" />
      </button>
    </div>
    <img alt="B2B logo" class="logo" src="@/assets/images/logo.svg" width="125" height="125" />

    <h1>Between 2 Bots</h1>
  </header>
</template>

<style scoped lang="scss">
header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.logo {
  border-radius: 25px;
}

.top-btn-container {
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
