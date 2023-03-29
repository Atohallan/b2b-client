<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark({
  selector: "body",
  attribute: "theme",
  valueDark: "custom-dark",
});
const toggleDark = useToggle(isDark);
</script>

<template>
  <header>
    <div class="mode">
      <button @click="toggleDark()">
        <font-awesome-icon :icon="isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" />
      </button>
    </div>
    <img alt="Vue logo" class="logo" src="@/assets/images/logo.svg" width="125" height="125" />

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

.mode {
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
